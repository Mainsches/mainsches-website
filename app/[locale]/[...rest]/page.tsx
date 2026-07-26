import { notFound } from "next/navigation";

/** Catch-all: any unknown path below a valid locale renders the branded 404. */
export default function CatchAll() {
  notFound();
}
