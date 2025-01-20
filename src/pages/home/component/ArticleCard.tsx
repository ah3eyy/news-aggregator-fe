import {IArticle} from "../../../interface/articles.ts";
import {useState} from "react";

interface IProps {
    article: IArticle
}

export const ArticleCard = ({article}: IProps) => {
    const [imageError, setImageError] = useState(false);
    const onVisit = (url: string) => {
        window.location.href = url;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        }).format(date);
    };


    return (
        <div
            onClick={() => onVisit(article.news_url)}
            className={"w-full p-[16px] rounded-[15px] border-[#D7D7D7] border-[1px] flex justify-between gap-[20px]"}>

            <div className={"flex flex-col"}>
                <h4 className={"text-black font-bold text-[16px]"}>
                    {article.title}
                </h4>
                <p className={"text-black font-normal text-[14px]"}>
                    {article.content || article.description}
                </p>

                <div className={"flex max-md:flex-col max-md:gap-[10px]  gap-[10px] mt-[10px]"}>
                    <div
                        className={"bg-black text-white capitalize p-[5px] text-[10px] rounded-[5px] max-md:max-w-[100px]"}>
                        {article.category}
                    </div>
                    <div
                        className={"bg-black text-white capitalize p-[5px] text-[10px] rounded-[5px] max-md:max-w-[100px]"}>
                        {article.source.name}
                    </div>
                    <div className={"text-black"}>
                        {formatDate(article.published_date.toString())}
                    </div>
                </div>

                {
                    article.author && (
                        <div className={"flex max-md:flex-col max-md:gap-[10px]  gap-[10px] mt-[10px]"}>
                            <div
                                className={"bg-black text-white capitalize p-[5px] text-[10px] rounded-[5px] max-md:max-w-[100px]"}>
                                {article.author}
                            </div>

                        </div>
                    )
                }


            </div>

            <div>
                {
                    article.image_url && !imageError && (
                        <div className={"w-[100px] h-[100px] rounded-[10px]"}>
                            <img
                                src={article.image_url}
                                onError={() => setImageError(true)}
                                className={"overflow-hidden h-full w-full rounded-[10px]"}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
