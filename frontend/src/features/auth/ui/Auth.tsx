"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"


import {Button} from "@/shared/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from "@/shared/ui/form"
import {Input} from "@/shared/ui/input"
import Link from "next/link";
import {getRouteHome} from "@/shared/const/routes";

const FormSchema = z.object({
    login: z.string().min(2, {
        message: "Введено менее 2 символов.",
    }),
})

export const AuthForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
                <FormLabel className="text-3xl font-bold">Авторизация</FormLabel>
                <FormField
                    control={form.control}
                    name="login"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Логин" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Пароль" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex align-center gap-2">
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Вход</Button>
                    <Button asChild variant="ghost">
                        <Link href={getRouteHome()}>Как гость</Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
