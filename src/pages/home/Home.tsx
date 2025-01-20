import {useFetchArticles} from "../../hooks/querys/useArticle.tsx";
import {ArticleCard} from "./component/ArticleCard.tsx";
import {IArticle} from "../../interface/articles.ts";
import {useState} from "react";
import {Select, Spin} from "antd";
import Input from "../../components/Input.tsx";
import EmptyStateIcon from "../../components/icons/EmptyStateIcon.tsx";
import {useCategories, useSources} from "../../hooks/querys/useUtil.tsx";

export default function Home() {
    const {data: categories} = useCategories();
    const {data: sources} = useSources();

    const [query, setQuery] = useState<{
        keyword: string,
        date: string,
        category: string[],
        source: string[],
        page: number,
        pageSize: 20
    }>
    ({
        keyword: '',
        date: '',
        category: [],
        source: [],
        page: 1,
        pageSize: 20
    });

    const filterCategories = categories?.data?.filter((o: any) => !query.category.includes(o));
    const filterSources = sources?.data?.filter((o: any) => !query.source.includes(o));

    const {data, isLoading} = useFetchArticles(query as any)
    const onHandlePageChange = (new_page: number) => {
        setQuery({...query, page: new_page})
    }

    const onHandleChange = (key: string, value: string | []) => {
        setQuery({...query, [key]: value, page: '' as any})
    }


    return (
        <>
            <div className={"w-full h-full lg:p-[24px_350px] p-[24px]"}>

                <div className={"w-full  flex-col gap-[20px]  m-[12px_0]"}>

                    <div className={"flex gap-[15px] max-md:flex-col "}>
                        <Input type={'text'}
                               placeholder={'Keyword'}
                               onChange={(e) => onHandleChange('keyword', e.target.value)}
                               label={""}
                               value={query.keyword}
                               name={"keyword"}
                               customStyle={"!bg-white !border-[1px] !border-[#D7D7D7] !text-black"}
                        />

                        <Select
                            mode="multiple"
                            placeholder="Select Preferred Sources"
                            value={query.source}
                            onChange={(value) => onHandleChange('source', value as any)}
                            style={{width: '100%'}}
                            options={filterSources?.map((item: any) => ({
                                value: item,
                                label: item,
                            }))}
                        />
                    </div>

                    <div className={"flex gap-[15px] max-md:flex-col mt-[10px] "}>
                        <Select
                            mode="multiple"
                            placeholder="Select Preferred Category"
                            value={query.category}
                            onChange={(value) => onHandleChange('category', value as any)}
                            style={{width: '100%'}}
                            options={filterCategories?.map((item: any) => ({
                                value: item,
                                label: item,
                            }))}
                        />


                        <Input type={'date'}
                               placeholder={'Date'}
                               onChange={(e) => onHandleChange('date', e.target.value)}
                               label={""}
                               value={query.date}
                               name={"category"}
                               customStyle={"!bg-white !border-[1px] !border-[#D7D7D7] !text-black"}
                        />
                    </div>
                </div>

                <div className={"flex flex-col gap-[10px]"}>
                    {
                        data?.data?.data.map(
                            (article: IArticle, index: number) => <ArticleCard key={index} article={article}/>
                        )
                    }
                </div>

                {
                    data?.data?.data.length === 0 && (
                        <div className={"flex w-full justify-center items-center"}>
                            <EmptyStateIcon/>
                        </div>
                    )
                }

                {
                    isLoading && (
                        <div className={"w-full flex justify-center mt-[10px]"}>
                            <Spin/>
                        </div>
                    )
                }

                {
                    data?.data?.data.length > 0 && (
                        <div className="flex justify-center mt-[16px] mb-[10px]">
                            {data?.data?.links.slice(0, 4).map((link: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && onHandlePageChange(new URL(link.url).searchParams.get("page") as any)}
                                    disabled={!link.url}
                                    className={`p-[8px_16px] rounded-md mx-1 ${
                                        link.active
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {link.label.replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")}
                                </button>
                            ))}
                            {
                                query.page > 3 && (
                                    <button
                                        onClick={() => onHandlePageChange(query.page)}
                                        disabled={!data?.data.next_page_url}
                                        className={`p-[8px_16px] rounded-md mx-1  hover:bg-gray-300 bg-blue-500 text-white`}
                                    >
                                        {query.page}
                                    </button>
                                )
                            }

                            <button
                                onClick={() => data?.data.next_page_url && onHandlePageChange(new URL(data?.data.next_page_url).searchParams.get("page") as any)}
                                disabled={!data?.data.next_page_url}
                                className={`p-[8px_16px] rounded-md mx-1 bg-gray-200 hover:bg-gray-300`}
                            >
                                Next
                            </button>
                        </div>
                    )
                }
            </div>
        </>
    )
}
