export default function backgroundSvgGenerator(
    baseImg,
    imgSrc,
    baseWidth,
    baseHeight,
    multiplier,
    amount,
) {
    let currentHeight = baseHeight;
    let currentWidth = baseWidth;
    const svgArray = [baseImg];
    for (let i = 1; i <= (amount - 1); i += 1) {
        currentHeight = currentHeight * multiplier;
        currentWidth = currentWidth * multiplier;
        const newSvg = (
            <img
                src={imgSrc}
                style={{
                    width: `${currentHeight}px`,
                    height: `${currentWidth}px`,
                }}
            />
        );
        svgArray.push(newSvg);
    }

    return svgArray;
}
