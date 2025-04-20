export async function dbFetch(url: string, opts: RequestInit = {}) {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
}
