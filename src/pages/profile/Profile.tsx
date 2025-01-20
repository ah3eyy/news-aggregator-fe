import {userUser} from "../../hooks/querys/useProfile.tsx";
import {notification, Select, Spin} from "antd";
import {useEffect, useState} from "react";
import Button from "../../components/Button.tsx";
import {useSavePreference} from "../../hooks/mutation/userProfileMutation.tsx";
import {useCategories, userAuthor, useSources} from "../../hooks/querys/useUtil.tsx";

export default function Profile() {
    const {data: users, isLoading} = userUser();
    const {data: categories} = useCategories();
    const {data: sources} = useSources();
    const {data: authors} = userAuthor();

    const {mutate: savePreference, isPending: savePreferenceLoading} = useSavePreference();

    const [formData, setFormData] = useState<{
        categories: string[],
        sources: string[],
        authors: string[]
    }>({categories: [], sources: [], authors: []});

    const filterCategories = categories?.data?.filter((o: any) => !formData.categories?.includes(o));
    const filterSources = sources?.data?.filter((o: any) => !formData.sources?.includes(o));
    const filterAuthors = authors?.data?.filter((o: any) => !formData.authors?.includes(o));

    const onSavePreference = () => {
        savePreference(formData, {
            onSuccess: () => {
                notification.success({message: "Preference saved successfully."})
            },
            onError: (error) => {
                notification.error({message: error?.message || "An error occurred saving prefrence. Kindly try again"})
            }
        })
    }

    const onHandleValueChange = (key: string, value: string[]) => {
        setFormData({...formData, [key]: value})
    }

    const fillFormData = () => {
        const settings = users?.data.settings;
        let preference: Record<string, string[]> = {};
        for (const setting of settings) {
            preference[setting.key] = setting.value;
        }
        setFormData(preference as any);
    }

    useEffect(() => {
        if (users) fillFormData();
    }, [users])

    if (isLoading) return (
        <div className={"w-full flex justify-center mt-[10px]"}>
            <Spin/>
        </div>
    )

    return (
        <>
            <div className={"w-full h-full lg:p-[24px_350px] p-[24px] flex lg:justify-center"}>

                <div
                    className={"flex flex-col gap-[15px] lg:w-[50%] w-full border-[1px] border-[#D7D7D7] rounded-[14px] p-[24px] h-[40%]"}>

                    <h3 className={"text-[16px] font-bold text-black"}>Save Preference</h3>

                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Categories"
                        value={formData.categories}
                        onChange={(value) => onHandleValueChange('categories', value)}
                        style={{width: '100%'}}
                        options={filterCategories?.map((item: any) => ({
                            value: item,
                            label: item,
                        }))}
                    />


                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Authors"
                        value={formData.authors}
                        onChange={(value) => onHandleValueChange('authors', value)}
                        style={{width: '100%'}}
                        options={filterAuthors?.map((item: any) => ({
                            value: item,
                            label: item,
                        }))}
                    />

                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Sources"
                        value={formData.sources}
                        onChange={(value) => onHandleValueChange('sources', value)}
                        style={{width: '100%'}}
                        options={filterSources?.map((item: any) => ({
                            value: item,
                            label: item,
                        }))}
                    />

                    <div className={"w-full flex justify-end"}>
                        <Button
                            onSubmit={onSavePreference}
                            label={"Save Preference"}
                            loading={savePreferenceLoading}
                            disabled={savePreferenceLoading}
                            customStyle={"w-[40%]"}/>
                    </div>

                </div>

            </div>
        </>
    );
}
