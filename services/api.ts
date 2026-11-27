import type { Miembro, Plan } from "../types/gimnasio";

const API_URL = "https://6b0045397fc363ccff09fc19.mockapi.io";

export async function obtenerPlanes(): Promise<Plan[]> {
  const res = await fetch(`${API_URL}/plans`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("No se pudieron cargar los planes desde MockAPI");
  }
  return res.json();
}

export async function obtenerMiembros(): Promise<Miembro[]> {
  const res = await fetch(`${API_URL}/members`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("No se pudieron cargar los miembros desde MockAPI");
  }
  return res.json();
}

export async function obtenerMiembroPorId(id: string): Promise<Miembro> {
  const res = await fetch(`${API_URL}/members/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("No se pudo obtener el miembro desde MockAPI");
  }
  return res.json();
}

export async function crearMiembro(data: Miembro): Promise<Miembro> {
  const res = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("No se pudo guardar el miembro en MockAPI");
  }
  return res.json();
}

export async function actualizarMiembro(id: string, data: Miembro): Promise<Miembro> {
  const res = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("No se pudo actualizar el miembro en MockAPI");
  }
  return res.json();
}

export async function eliminarMiembro(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("No se pudo eliminar el miembro en MockAPI");
  }
}