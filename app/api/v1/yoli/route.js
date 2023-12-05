
import HuffmanCoder from "@/middleware/huffman";



const coder = new HuffmanCoder();
export async function POST(req) {
  const { text } = await req.json();
  const [decoded, tree_structure, info] = coder.decode(text);
  return new Response(JSON.stringify({
    decoded,
    tree_structure,
    info,
  }), { status: 200 });

}
