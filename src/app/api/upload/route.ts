import { ossClient } from '@/lib/oss.ts'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File // `file` 是 FormData key
  // console.log("file...", file);
  try {
    const randomStr = Math.random().toString().slice(-5) // 随机数
    const newFileName = `${randomStr}.${file.name}`
    const result = await ossClient.put(
      `imgs/${newFileName}`,
      Buffer.from(await file.arrayBuffer())
    )
    console.log('result', result)
    return Response.json({ errno: 0, data: { name: result.name } })
  } catch (e) {
    console.error(e)
    return Response.json({ errno: -1 })
  }
}