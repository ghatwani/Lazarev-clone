function LocomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}

function navAnimation() {
    let nav = document.querySelector("nav")
    nav.addEventListener("mouseenter", () => {
        let tl = gsap.timeline() // it is used to make the process synchronous first the div will extend its length and then the element will pop
        tl.to(".nav-bottom", {
            height: "21vh"
        })
        tl.to(".nav-part-2 h5", {
            display: "block"
        })
        tl.from(".nav-part-2 h5 span", {
            y: 25,
            stagger: 0.1,
            duration: 0.2
        })
    })
    nav.addEventListener("mouseleave", () => {
        let tl = gsap.timeline() // it is used to make the process synchronous first the div will extend its length and then the element will pop
        tl.to(".nav-part-2 h5 span", {
            y: 25,
            stagger: 0.1,
            duration: 0.05
        })
        tl.to(".nav-part-2 h5", {
            display: "none"
        })
        tl.to(".nav-bottom", {
            height: "0"
        })
    })
}

function Page2Animation() {

    var RightElems = document.querySelectorAll(".right-elem");
    // console.log(RightElems);
    RightElems.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {

            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", () => {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", (dets) => {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x,
                y: dets.y - elem.getBoundingClientRect().y - 150
            })

        })
    })
}

function page3Animation() {

    let page3Animate = document.querySelector(".page3-center")
    let video = document.querySelector(".page3 video")

    page3Animate.addEventListener("click", () => {
        video.play()
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })

    video.addEventListener("click", () => {
        video.pause();
        gsap.to(video, {
            transform: "scaleX(0) scaleY(0)",
            opacity: 0,
            borderRadius: "50%"
        })
    })
}

function page4Animation() {
    let sections = document.querySelectorAll(".sec-right")
    sections.forEach((elem) => {
        // console.log(elem.childNodes)
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1
            elem.childNodes[3].play()
        })
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0
            elem.childNodes[3].load() //to restart
        })

    })
}

function page6Animation() {

    gsap.to(".bottom-6 h4", {
        x: 10,
        duration: 1,
        scrollTrigger: {
            trigger: ".bottom-6",
            scroller: ".main",
            // markers:true,
            start: "top 30%",
            end: "top -10%",
            scrub: true
        }
    })

}
function LoadingAnimation() {


    const t1 = gsap.timeline()

    t1.from(".page1", {
        opacity: 0,
        duration: 0.3,
        delay: 0.2
    })
    t1.from(".page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    t1.from("nav", {
        opacity: 0
    })
    t1.from(".page1 p, .page1 div, .page1 h1", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })


}

LoadingAnimation();
LocomotiveAnimation();
navAnimation();
Page2Animation();
page3Animation();
page4Animation();
page6Animation();
