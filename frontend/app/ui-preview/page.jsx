import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';

export default function UIPreviewPage() {
  return (
    <Container className="py-10 space-y-8">
      {/* --- Phần Button --- */}
      <div>
        <h1 className="text-2xl font-bold mb-4">1. Component: Button</h1>
        <div className="flex flex-wrap items-start gap-4">
          <Button variant="primary">Primary (Mặc định)</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-end gap-4 mt-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium (Mặc định)</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
      <hr />
      {/* --- Phần Input & Select --- */}
      <div>
        <h1 className="text-2xl font-bold mb-4">2. Component: Input & Select</h1>
        <div className="max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Input (Kiểu text)</label>
            <Input id="name" type="text" placeholder="Nhập tên của bạn..." />
          </div>
          <div>
            <label htmlFor="disabled-input" className="block text-sm font-medium text-gray-700 mb-1">Input (Bị vô hiệu hóa)</label>
            <Input id="disabled-input" type="text" placeholder="Không thể nhập" disabled />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Select (Menu chọn)</label>
            <Select id="category">
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
            </Select>
          </div>
        </div>
      </div>
    </Container>
  );
}