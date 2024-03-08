import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-sky-300 via-sky-500 to-sky-700">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Jordan 4 Retro</CardTitle>
              <CardDescription>White Cement</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              <Image src="/product1.jpg" alt="jordan" width={200} height={200}/>
              <p>Price: $350</p>
              <Link href="https://buy.stripe.com/test_7sIcMYgpA57D5b2aEE" target="_blank">
                <Button>
                  Buy Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}