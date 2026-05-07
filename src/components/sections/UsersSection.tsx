"use client";

import { useState } from "react";
import { users } from "@/lib/data";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Eye,
  ChevronUp,
  ChevronDown,
  Download,
} from "lucide-react";

const roleColors: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "var(--layer-red)", color: "var(--accent-red)" },
  Analyst: { bg: "var(--layer-blue)", color: "var(--accent-blue)" },
  "Security Engineer": { bg: "var(--layer-purple)", color: "var(--accent-purple)" },
  Viewer: { bg: "rgba(107,114,128,0.1)", color: "#9ca3af" },
};

const statusColors: Record<string, { bg: string; color: string; dot: string }> = {
  Active: { bg: "var(--layer-green)", color: "var(--accent-green)", dot: "status-online" },
  Inactive: { bg: "rgba(107,114,128,0.1)", color: "#9ca3af", dot: "status-offline" },
  Suspended: { bg: "var(--layer-red)", color: "var(--accent-red)", dot: "status-danger" },
};

export default function UsersSection() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const roles = ["All", "Admin", "Analyst", "Security Engineer", "Viewer"];
  const statuses = ["All", "Active", "Inactive", "Suspended"];

  const filtered = users
    .filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === "All" || u.role === filterRole;
      const matchStatus = filterStatus === "All" || u.status === filterStatus;
      return matchSearch && matchRole && matchStatus;
    })
    .sort((a, b) => {
      const aVal = (a as any)[sortField];
      const bVal = (b as any)[sortField];
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: string }) =>
    sortField === field ? (
      sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : (
      <ChevronDown size={12} style={{ opacity: 0.3 }} />
    );

  const stats = [
    { label: "Total Users", value: users.length, color: "var(--accent-blue)" },
    { label: "Active", value: users.filter((u) => u.status === "Active").length, color: "var(--accent-green)" },
    { label: "Inactive", value: users.filter((u) => u.status === "Inactive").length, color: "#9ca3af" },
    { label: "Suspended", value: users.filter((u) => u.status === "Suspended").length, color: "var(--accent-red)" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 card-hover"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {/* Toolbar */}
        <div
          className="flex flex-wrap items-center gap-3 p-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 min-w-[200px]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <Search size={14} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  background: filterRole === r ? "var(--layer-blue)" : "var(--bg-secondary)",
                  color: filterRole === r ? "var(--accent-blue)" : "var(--text-secondary)",
                  border: `1px solid ${filterRole === r ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg outline-none"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="ml-auto flex gap-2">
            <button
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <Download size={13} />
              Export
            </button>
            <button
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors font-semibold"
              style={{
                background: "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                color: "white",
              }}
            >
              <UserPlus size={13} />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("name")}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    User <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-left">Role</th>
                <th className="text-left">Status</th>
                <th className="text-left">Location</th>
                <th className="text-left">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("lastLogin")}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Last Login <SortIcon field="lastLogin" />
                  </button>
                </th>
                <th className="text-left">Threats</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={{ color: "var(--text-primary)" }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
                        style={{
                          width: 34,
                          height: 34,
                          background: user.avatarColor,
                        }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: roleColors[user.role]?.bg,
                        color: roleColors[user.role]?.color,
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className="status-dot"
                        style={{
                          background:
                            user.status === "Active"
                              ? "var(--accent-green)"
                              : user.status === "Suspended"
                              ? "var(--accent-red)"
                              : "#6b7280",
                          boxShadow:
                            user.status === "Active"
                              ? "0 0 6px #10b981"
                              : user.status === "Suspended"
                              ? "0 0 6px #ef4444"
                              : "none",
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: statusColors[user.status]?.color }}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {user.location}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {user.lastLogin}
                    </span>
                  </td>
                  <td>
                    {user.threats > 0 ? (
                      <span
                        className="badge"
                        style={{ background: "var(--layer-red)", color: "var(--accent-red)" }}
                      >
                        {user.threats} threat{user.threats > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span
                        className="badge"
                        style={{ background: "var(--layer-green)", color: "var(--accent-green)" }}
                      >
                        Clean
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-1 relative">
                      <button
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        title="More"
                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      >
                        <MoreVertical size={14} />
                      </button>
                      {openMenu === user.id && (
                        <div
                          className="absolute right-0 top-8 rounded-xl py-1 z-10 min-w-[140px]"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                          }}
                        >
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-left"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <Shield size={12} /> Assign Role
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-left"
                            style={{ color: "var(--accent-red)" }}
                          >
                            <Trash2 size={12} /> Remove User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Showing {filtered.length} of {users.length} users
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-7 h-7 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: p === 1 ? "var(--layer-blue)" : "var(--bg-secondary)",
                  color: p === 1 ? "var(--accent-blue)" : "var(--text-secondary)",
                  border: `1px solid ${p === 1 ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




