import Editor from '@/components/Editor'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            撤销重做功能测试
          </h1>
          <p className="text-lg text-gray-600">
            请尝试以下操作来测试撤销重做功能：
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>1. 输入一些文字</p>
            <p>2. 点击「撤销」按钮或按 Ctrl+Z</p>
            <p>3. 点击「重做」按钮或按 Ctrl+Y</p>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}