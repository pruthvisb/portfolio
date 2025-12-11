import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants/index.js";
import {Check} from "lucide-react";

const Terminal = () => {
    return (
        <>
            <div id="window-header" >
                <p> Window Controls</p>
                <h2>Science Stack</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@pruthvi %</span>
                    will be updated soon
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Science</p>
                </div>

            </div>

        </>
    );
};
const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;
