/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
    // ビューポート要素を取得
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    // 条件に基づいて適用するビューポートの設定を決定
    const viewportContent = window.outerWidth > 380 ? "width=device-width, initial-scale=1" : "width=380";

    // ビューポート要素が存在しない場合はreturn
    if (!viewportMeta) return;

    // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
    if (viewportMeta.getAttribute("content") !== viewportContent) {
        viewportMeta.setAttribute("content", viewportContent);
    }
};
switchViewport();
window.addEventListener("resize", switchViewport);

//** tab menu **//
// const initializedTabMenu = () => {
//     const menuItems = document.querySelectorAll(".js-menu-item");
//     const contents = document.querySelectorAll(".js-content");

//     // Opening Keyframe
//     const openingKeyframes = {
//         opacity: [0, 1],
//         transform: ["translateY(20px)", "translateY(0)"],
//     };

//     // Option
//     const options = {
//         duration: 300,
//         easing: "ease-in-out",
//         fill: "forwards",
//     };

//     if (!menuItems || !contents) return;

//     for (let i = 0; i < menuItems.length; i++) {
//         //menuitemsの切り替え
//         menuItems[i].addEventListener("click", (e) => {
//             e.preventDefault();

//             //クリックしたmenuitemを選択。それ以外を解除。
//             menuItems.forEach((item) => {
//                 item.parentNode.classList.remove("is-active");
//             });
//             menuItems[i].parentNode.classList.add("is-active");

//             //クリックしたmenuitemに該当するcontentを表示。それ以外を非表示。
//             contents.forEach((content) => {
//                 content.classList.remove("is-active");
//             });
//             contents[i].classList.add("is-active");
//             contents[i].animate(openingKeyframes, options);
//         });
//     }
// };

// initializedTabMenu();

const tabMenu = () => {
    const tabs = document.querySelectorAll("[data-button]");
    const contents = document.querySelectorAll("[data-content]");

    // Keyframe
    const openingKeyframes = {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0)"],
    };

    // Option
    const openingOptions = {
        duration: 300,
        easing: "ease-out",
        fill: "forwards",
    };

    const tabClick = (e) => {
        //クリックされたdata-buttonの値
        const targetValue = e.target.dataset.button;
        console.log('targetValue');

        //クリックされたtab
        const targetTab = tabs[targetValue];
        console.log(targetTab);

        //クリックされたtabに対応するcontents
        const targetContent = document.querySelector(`[data-content="${targetValue}"]`);

        //全てのis-activeをremove
        [...tabs, ...contents].forEach((array) =>  array.classList.remove("is-active"));
        // [tabs, contents].forEach((array) => {
        //     array.classList.remove("is-active");
        // });

        //クリックしたタブにis-activeをadd
        targetTab.classList.add("is-active");

        //クリックしたコンテンツにis-activeをadd
        targetContent.classList.add("is-active");
        targetContent.animate(openingKeyframes, openingOptions);
    };

    //tabsクリックで発火
    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => tabClick(e));
    });
};

tabMenu();
