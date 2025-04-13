import * as React from "react";
import { cn } from "@/lib/utils";



export function TypographyH1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props} />
  );
}

export function TypographyH2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", className)} {...props} />
  );
}

export function TypographyH3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
  );
}

export function TypographyH4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  );
}

export function TypographyH5({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("text-lg font-semibold", className)} {...props} />
  );
}

export function TypographyH6({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6 className={cn("text-base font-medium", className)} {...props} />
  );
}

export function TypographyP({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  );
}

export function TypographyBlockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
  );
}

export function TypographyUl({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  );
}

export function TypographyOl({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  );
}

export function TypographyCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)} {...props} />
  );
}

export function TypographyLead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  );
}

export function TypographyLarge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props} />
  );
}

export function TypographySmall({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)} {...props} />
  );
}


export function TypographyMuted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-gray-400", className)} {...props} />
  );
}

export function TypographyExtraSmallMuted({className,...props}:React.HtmlHTMLAttributes<HTMLParagraphElement>){
    return(
        <p  className={cn("text-xs text-gray-400")} {...props}/>
    )
}
