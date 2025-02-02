import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { QuizMetaData } from "@/types"
import { Button } from "./ui/button"
import Link from "next/link"

export default function QuizCard({
    title,
    duration,
    topic,
    questions_count,
    id
}: Partial<QuizMetaData>) {
    return (
        <Card
            className="max-w-[300px]"
        >
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{topic}</CardDescription>
            </CardHeader>


            <CardFooter className="flex justify-between">
                <p className="text-lg font-semibold text-green-500">{duration} Minutes</p>
                <p className="text-lg font-semibold text-green-500">{questions_count} Q</p>

                <Link href={'/quiz/' + id}>
                    <Button className="bg-emerald-600 hover:bg-emerald-600/50 font-bold">
                        Start
                    </Button>
                </Link>

            </CardFooter>
        </Card>

    )
}