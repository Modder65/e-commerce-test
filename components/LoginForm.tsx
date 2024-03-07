"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "@/actions/login";
import Link from "next/link";
import Image from "next/image";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl: string | null = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    login(values, callbackUrl)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          return;
        }
      })
      .catch(() => toast.error("Something went wrong!"))
  }

  return ( 
    <Card className="w-[310px] sm:w-[400px] md:w-[700px]">
      <CardHeader>
        <div className="flex justify-center items-center gap-x-2">
          <Image src="/logo.svg" width={35} height={35} alt="logo"/>
          <CardTitle>E-Commerce</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="mt-8">
          <Link href="/register"><p className="font-xs hover:text-sky-500">Dont have an account? Register</p></Link>
        </div>
      </CardFooter>
    </Card>
   );
}
 
export default LoginForm;