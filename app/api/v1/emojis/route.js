
import HuffmanCoder from "@/middleware/huffman";



const coder = new HuffmanCoder();
export async function POST(req) {
  const { text } = await req.json();
  const [encoded, tree_structure, info] = coder.encode(text);
  return new Response(JSON.stringify({
    encoded,
    tree_structure,
    info,
  }), { status: 200 });

}
