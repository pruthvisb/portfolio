import {useLayoutEffect, useRef} from "react";
import { useWindowStore } from "#store/window.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { Draggable} from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, ZIndex } = windows[windowKey] || {};
        const ref = useRef(null);

        useGSAP(() =>{
            const el = ref.current;
            if (!el || !isOpen) return;
            el.style.display = "block";

            gsap.fromTo(el,{ scale: 0.8, opacity: 0, y: 40},{scale: 1, opacity: 1, y: 0, duration: 0.3, ease:"power3.out"},);

        }, [isOpen]);
        useGSAP(() =>{
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) });
            return () => instance.kill();
        }, []);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        if (!isOpen) return null; // don't render if the window is closed

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex: ZIndex }}
                className="absolute top-20 left-20"
                onMouseDown={() => focusWindow(windowKey)} // bring window to front
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapped(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;
