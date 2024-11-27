import { useDimensions } from "../providers";

export const calculateBasePoints = (dimensions: ReturnType<typeof useDimensions>) => {
    const {
        barWidth,
        borderWidth,
        pointWidth,
        checkerWidth,
        boardHeight,
        checkerStroke,
    } = dimensions;
    return {
        24: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3, y: borderWidth + checkerWidth / 2 + checkerStroke },
        23: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth, y: borderWidth + checkerWidth / 2 + checkerStroke },
        22: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 2, y: borderWidth + checkerWidth / 2 + checkerStroke },
        21: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 3, y: borderWidth + checkerWidth / 2 + checkerStroke },
        20: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 4, y: borderWidth + checkerWidth / 2 + checkerStroke },
        19: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 5, y: borderWidth + checkerWidth / 2 + checkerStroke },

        18: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 6, y: borderWidth + checkerWidth / 2 + checkerStroke },
        17: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 7, y: borderWidth + checkerWidth / 2 + checkerStroke },
        16: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 8, y: borderWidth + checkerWidth / 2 + checkerStroke },
        15: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 9, y: borderWidth + checkerWidth / 2 + checkerStroke },
        14: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 10, y: borderWidth + checkerWidth / 2 + checkerStroke },
        13: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 11, y: borderWidth + checkerWidth / 2 + checkerStroke },

        1: { x: borderWidth + checkerWidth / 2 + checkerStroke  * 3, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        2: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        3: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 2, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        4: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 3, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        5: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 4, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        6: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + pointWidth * 5, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },

        7: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 6, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        8: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 7, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        9: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 8, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        10: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 9, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        11: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 10, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },
        12: { x: borderWidth + checkerWidth / 2 + checkerStroke * 3 + barWidth + pointWidth * 11, y: boardHeight - borderWidth - checkerWidth / 2 - checkerStroke },


    };
};
