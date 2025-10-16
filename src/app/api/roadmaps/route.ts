import { connectToDatabase } from "@/lib/utils";
import { Roadmap } from "@/models/roadmapSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    // ✅ If specific title requested
    if (title) {
      const roadmapData = await Roadmap.findOne({ title }).select("roadmap");

      if (!roadmapData) {
        return NextResponse.json(
          { success: false, message: "No roadmap found for this title" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, roadmap: roadmapData.roadmap });
    }

    // ✅ Get all roadmaps from DB
    const allRoadmaps = await Roadmap.find().select("title roadmap");

    return NextResponse.json({ success: true, data: allRoadmaps });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error: " + err },
      { status: 500 }
    );
  }
}

// ✅ POST request to save a new roadmap
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const newRoadmap = new Roadmap({
      title: body.title,
      roadmap: body.roadmap,
    });

    await newRoadmap.save();

    return NextResponse.json(
      { success: true, message: "Roadmap saved", data: newRoadmap },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error: " + err },
      { status: 500 }
    );
  }
}
