import { useRef, useState, useEffect } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
    let currentSlide = useRef(0)
    //console.log(currentSlide)
    let [current, setCurrent] = useState(0)
    const [slide, setslide] = useState(slides[0])
    let previousSlide = () => {
        //at the first slide case
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        // console.log(currentSlide.current)
        currentSlide.current = currentSlide.current + 1
        if (currentSlide.current === slides.length) {
            currentSlide.current = 0
        }
        setslide(slides[currentSlide.current])
    };
    //let s=slides[currentSlide.current];
    //console.log(slides)
    // console.log('current', current)

    // const interval = setInterval(() => {
    //   nextSlide();
    // }, 3000);

    //setInterval(nextSlide(),2000);
    useEffect(() => {
        // console.log("entered");


        setInterval(() => {
            nextSlide()

        }, 2000)


        //return () => clearInterval(interval); // Cleanup function
    }, []);
    return (

        <div className="overflow-hidden relative">

            {/* {slides.map((s) => {
                    return <img src={s} />;
                }
                )} */}
            {/* This one has its h fixed!--getELEbyID can be used ig */}

            <img className="h-80 w-full" src={slide} />


            <div className="absolute top-0 h-full w-full justify-between items-center flex text-black px-10 text-3xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {

                    return (
                        <div

                            onClick={() => {
                                // console.log(current)
                                currentSlide.current = i
                                setslide(slides[i])
                            }}
                            key={"circle" + i}
                            className={`rounded-full border-2  w-5 h-5 cursor-pointer  ${i === currentSlide.current ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>


        </div>
    )
}