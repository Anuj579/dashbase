import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="space-y-4">
        <Input placeholder='Enter you name' />
        <Button className='w-full'>Button</Button>
      </div>
    </div>
  );
}
