// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { domain } = await request.json();

//     if (!domain) {
//       return NextResponse.json({ error: "Domain is required" }, { status: 400 });
//     }

//     const projectId = process.env.VERCEL_PROJECT_ID;
//     const token = process.env.VERCEL_AUTH_TOKEN;
//     const teamId = process.env.VERCEL_TEAM_ID; // Optional, if using a team

//     let url = `https://api.vercel.com/v10/projects/${projectId}/domains`;
//     if (teamId) {
//       url += `?teamId=${teamId}`;
//     }

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: domain }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json({ error: data.error?.message || "Failed to add domain" }, { status: response.status });
//     }

//     return NextResponse.json({ success: true, domainData: data });
//   } catch (error) {
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }






import { NextResponse } from "next/server";

// GET: Fetch all domains for the project
export async function GET() {
  try {
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_AUTH_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID;

    let url = `https://api.vercel.com/v9/projects/${projectId}/domains`;
    if (teamId) {
      url += `?teamId=${teamId}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed to fetch domains" }, { status: response.status });
    }

    return NextResponse.json({ success: true, domains: data.domains });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add a domain (same as before)
export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ error: "Domain is required" }, { status: 400 });

    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_AUTH_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID;

    let url = `https://api.vercel.com/v10/projects/${projectId}/domains`;
    if (teamId) url += `?teamId=${teamId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.error?.message || "Failed to add domain" }, { status: response.status });

    return NextResponse.json({ success: true, domainData: data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}