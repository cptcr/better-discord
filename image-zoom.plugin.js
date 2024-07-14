/**
 * @name ImageZoom
 * @version 1.0.0
 * @description Zoom in on images by clicking on them.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;

module.exports = class ImageZoom {
    start() {
        const ImageComponent = WebpackModules.getModule(m => m.default?.displayName === "Image");

        Patcher.after(ImageComponent, "default", (thisObject, [props], returnValue) => {
            returnValue.props.onClick = () => {
                const imageUrl = props.src;
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.position = 'fixed';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.maxWidth = '90%';
                img.style.maxHeight = '90%';
                img.style.zIndex = 1000;
                img.onclick = () => img.remove();
                document.body.appendChild(img);
            };
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
