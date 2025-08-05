// SortDropdown.jsx
import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const sortOptions = [
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Price: High to Low", value: "priceHighToLow" },
    { label: "Newest First", value: "newest" },
    { label: "Popularity", value: "popularity" },
];

const SortDropdown = ({ value, onChange }) => {
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50">
                <Select.Value placeholder="Sort by" />
                <Select.Icon>
                    <ChevronDown className="w-4 h-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="bg-white rounded-md border shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center">
                        <ChevronUp />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-1">
                        {sortOptions.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                className="relative flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute right-2">
                                    <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center">
                        <ChevronDown />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default SortDropdown;
