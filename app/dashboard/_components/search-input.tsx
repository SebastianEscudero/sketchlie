"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  theme: string;
}

export const SearchInput = ({
  theme
}: SearchInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/dashboard/",
      query: {
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
      />
      <Input
        className={`w-full max-w-[516px] pl-9 ${theme === "dark" ? "bg-[#383838] border-none text-zinc-400" : ""}`}
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};