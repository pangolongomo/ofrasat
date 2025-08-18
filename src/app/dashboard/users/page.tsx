"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "EDITOR",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      setShowCreateUser(false);
      setNewUser({ name: "", email: "", password: "", role: "EDITOR" });
      fetchUsers();
    } else {
      const error = await response.json();
      alert(error.error || "Erreur lors de la création");
    }
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const response = await fetch(`/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    });

    if (response.ok) {
      setEditingUser(null);
      setEditUser({ name: "", email: "", role: "EDITOR" });
      fetchUsers();
    } else {
      const error = await response.json();
      alert(error.error || "Erreur lors de la modification");
    }
  };

  const deleteUser = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchUsers();
      } else {
        const error = await response.json();
        alert(error.error || "Erreur lors de la suppression");
      }
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  if (!session) return null;

  const canCreateUsers = ["SUPERADMIN", "ADMIN"].includes(session.user.role);
  const canCreateAdmins = session.user.role === "SUPERADMIN";
  const canManageUsers = ["SUPERADMIN", "ADMIN"].includes(session.user.role);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestion des Utilisateurs
        </h1>
        {canCreateUsers && (
          <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Utilisateur
              </Button>
            </DialogTrigger>
          </Dialog>
        )}
      </div>

      {/* Create User Modal */}
      <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
        <DialogContent className="backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Créer un utilisateur</DialogTitle>
            <DialogDescription>
              Ajouter un nouvel utilisateur au système
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                required
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  {canCreateAdmins && (
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateUser(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Créer</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <DialogContent className="backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifier les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={updateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nom</Label>
              <Input
                id="edit-name"
                type="text"
                required
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                required
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Rôle</Label>
              <Select
                value={editUser.role}
                onValueChange={(value) =>
                  setEditUser({ ...editUser, role: value })
                }
                disabled={
                  editingUser?.role === "SUPERADMIN" && !canCreateAdmins
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  {(canCreateAdmins || editingUser?.role === "ADMIN") && (
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  )}
                  {editingUser?.role === "SUPERADMIN" && (
                    <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingUser(null)}
              >
                Annuler
              </Button>
              <Button type="submit">Modifier</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View User Modal */}
      <Dialog
        open={!!viewingUser}
        onOpenChange={(open) => !open && setViewingUser(null)}
      >
        <DialogContent className="backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
            <DialogDescription>
              Informations complètes de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Nom</Label>
              <p className="mt-1 text-sm">{viewingUser?.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="mt-1 text-sm">{viewingUser?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Rôle</Label>
              <p className="mt-1 text-sm">{viewingUser?.role}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Date de création</Label>
              <p className="mt-1 text-sm">
                {viewingUser &&
                  new Date(viewingUser.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="secondary" onClick={() => setViewingUser(null)}>
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {canManageUsers && (
                      <button
                        onClick={() => setViewingUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {canManageUsers &&
                      user.id !== session.user.id &&
                      (canCreateAdmins || user.role !== "SUPERADMIN") && (
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-green-600 hover:text-green-900"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    {canManageUsers &&
                      user.id !== session.user.id &&
                      (canCreateAdmins || user.role !== "SUPERADMIN") && (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
