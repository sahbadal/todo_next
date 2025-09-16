import { connectDB } from "@/lib/config/db";
import Todo from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function GET(request) {
  const todos = await Todo.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ todos });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await Todo.create({
    title,
    description,
  });

  return NextResponse.json({ message: "Todo created!" });
}

export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");

  await Todo.findByIdAndDelete(mongoId);

  return NextResponse.json({ message: "Todo deleted!" });
}

export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");

  await Todo.findByIdAndUpdate(mongoId, {
    $set: { isCompleted: true },
  });

  return NextResponse.json({ message: "Todo Completed!" });
}
