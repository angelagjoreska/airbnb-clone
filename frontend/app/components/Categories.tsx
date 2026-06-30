"use client";

import React from "react";
import {
    Waves,
    Home,
    Palmtree,
    Snowflake,
    Coffee,
    Map,
    Tent,
    Castle
} from "lucide-react";

// Ова е делот што ја решава грешката TS2322 од твојата прва слика
interface CategoriesProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
    // Дефинирање на листите со икони
    const categories = [
        { label: "All", icon: Map },
        { label: "APARTMENT", icon: Coffee },
        { label: "HOUSE", icon: Home },
        { label: "VILLA", icon: Palmtree },
        { label: "CABIN", icon: Tent },
        { label: "COTTAGE", icon: Waves },
        { label: "STUDIO", icon: Snowflake },
        { label: "LOFT", icon: Castle },
        { label: "GUESTHOUSE", icon: Home },
    ];

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            padding: "20px 40px",
            backgroundColor: "#000",
            borderBottom: "1px solid #222",
            overflowX: "auto",
            whiteSpace: "nowrap"
        }}>
            {categories.map((cat) => {
                const isActive = selectedCategory === cat.label;

                return (
                    <div
                        key={cat.label}
                        onClick={() => setSelectedCategory(cat.label)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            paddingBottom: "10px",
                            transition: "all 0.2s ease",
                            // Линијата под категоријата ако е активна
                            borderBottom: isActive ? "2px solid white" : "2px solid transparent",
                            color: isActive ? "white" : "#717171",
                            minWidth: "70px"
                        }}
                    >
                        <cat.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{
                            fontSize: "12px",
                            fontWeight: isActive ? "600" : "500"
                        }}>
              {cat.label}
            </span>
                    </div>
                );
            })}
        </div>
    );
}
