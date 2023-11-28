'use client'
import { mobileData } from "@/lib/data";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Image from "next/image";

  type ProjectProps = typeof mobileData[number]
  
  export function CardDefault({title, description, tags, imageUrl,siteUrl, gitUrl}:ProjectProps) {
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56 mx-3">
          <Image
            src={imageUrl}
            alt="card-image"
            className="h-full"
          />
        </CardHeader>
        <CardBody className="mx-6 mt-4">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography>
            {description}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="my-2">
            <p>Created With:</p>
            <ul className='flex flex-wrap mt-4 gap-2 sm:mt-auto'>
            {tags.map((tag, index) => (
                <li className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/70 rounded-full' key={index}>{tag}</li>
            ))}
        </ul>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 m-4">
            {
              siteUrl === null ? null : (<a href={siteUrl} target="_blank">
              <Button className="px-3">Go To Site</Button>
              </a>)
            }
          <a href={gitUrl} target="_blank">
          <Button className="ml-2 px-3">Go To GitHub</Button>
          </a>
        </CardFooter>
      </Card>
    );
  }