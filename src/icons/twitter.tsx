import React from "react";

export const Twitter = ({ ...props }) => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M23.5 0H14.71L12 3.91L9.29 0H0.5L9.64 12L0 24H8.71L12 19.5L15.29 24H23.5L13.86 12L23.5 0ZM13.06 12L17.84 18H14.53L12 14.72L9.47 18H6.16L10.94 12L6.16 6H9.47L12 9.28L14.53 6H17.84L13.06 12Z"
                fill="url(#paint0_linear_7650_13898)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_7650_13898"
                    x1="1.88679"
                    y1="6.81819"
                    x2="35.1887"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#3352CC" />
                    <stop offset="1" stop-color="#1C2D70" />
                </linearGradient>
            </defs>
        </svg>

    );
};
