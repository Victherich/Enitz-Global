import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { domain } = params;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_AUTH_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID;

    let url = `https://api.vercel.com/v9/projects/${projectId}/domains/${domain}`;
    if (teamId) url += `?teamId=${teamId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json({ error: data.error?.message || "Failed to remove domain" }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { domain } = params;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_AUTH_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID;

    let url = `https://api.vercel.com/v9/projects/${projectId}/domains/${domain}/verify`;
    if (teamId) url += `?teamId=${teamId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    // Even if verification fails (e.g. 400 status because DNS isn't set yet), 
    // Vercel's error response often contains the exact verification details needed!
    return NextResponse.json({ 
      success: response.ok, 
      domainInfo: data 
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}