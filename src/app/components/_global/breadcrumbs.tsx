import Link from "next/link";

type breadcrumbProps = {
    crumbs: string[][];
    pageName: string;
}

export default function Breadcrumbs(props: breadcrumbProps) {
    const { crumbs, pageName } = props;

    return (
        <div className="breadcrumbs my-8">
            <Link href="/">Home</Link>
            <div className="divider"></div>
            {crumbs && crumbs.map((crumb: string[]) => (
                <div key={crumb[0]}>
                    <Link href={crumb[0]}>{crumb[1]}</Link>
                    <div className="divider"></div>
                </div>
            ))}
            {pageName}
        </div>
    );
};