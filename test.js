'use strict';

var test = require('tape').test;
var Delaunator = require('./');

var points = [[168, 180], [168, 178], [168, 179], [168, 181], [168, 183], [167, 183], [167, 184], [165, 184], [162, 186], [164, 188], [161, 188], [160, 191], [158, 193], [156, 193], [152, 195], [152, 198], [150, 198], [147, 198], [148, 205], [150, 210], [148, 210], [148, 208], [145, 206], [142, 206], [140, 206], [138, 206], [135, 206], [135, 209], [131, 209], [131, 211], [127, 211], [124, 210], [120, 207], [120, 204], [120, 202], [124, 201], [123, 201], [125, 198], [125, 194], [127, 194], [127, 191], [130, 191], [132, 189], [134, 189], [134, 186], [136, 184], [134, 182], [134, 179], [134, 176], [136, 174], [139, 174], [141, 177], [142, 176], [144, 176], [147, 178], [148, 176], [151, 178], [154, 178], [153, 175], [152, 174], [152, 170], [152, 168], [150, 166], [148, 166], [147, 165], [145, 162], [146, 160], [146, 157], [146, 155], [144, 155], [142, 152], [140, 150], [138, 150], [138, 148], [140, 145], [140, 142], [140, 138], [139, 138], [137, 138], [135, 138], [133, 135], [132, 132], [129, 132], [128, 132], [124, 132], [124, 130], [123, 130], [118, 126], [116, 124], [112, 122], [109, 122], [105, 122], [102, 124], [100, 124], [97, 124], [95, 126], [92, 127], [89, 127], [88, 130], [85, 132], [80, 134], [72, 134], [69, 134], [65, 138], [64, 138], [58, 137], [56, 133], [52, 133], [51, 133], [48, 133], [44, 133], [41, 131], [38, 130], [35, 130], [32, 127], [30, 127], [27, 127], [24, 127], [24, 126], [23, 124], [20, 122], [17, 122], [16, 118], [15, 116], [15, 110], [18, 108], [20, 102], [24, 97], [28, 102], [28, 98], [26, 97], [28, 94], [27, 85], [29, 79], [32, 76], [39, 70], [44, 66], [48, 65], [53, 61], [53, 58], [51, 54], [54, 54], [52, 48], [51, 43], [48, 42], [49, 38], [48, 34], [51, 30], [53, 33], [58, 30], [61, 30], [60, 27], [64, 26], [68, 24], [74, 24], [80, 24], [85, 26], [92, 26], [96, 29], [103, 32], [109, 33], [112, 37], [116, 37], [120, 37], [124, 35], [126, 35], [128, 38], [132, 38], [134, 41], [138, 38], [140, 36], [142, 40], [144, 43], [145, 41], [149, 41], [155, 41], [159, 41], [161, 46], [165, 46], [164, 42], [164, 39], [164, 34], [167, 30], [173, 24], [178, 24], [184, 24], [189, 26], [195, 21], [195, 20], [199, 20], [203, 20], [207, 17], [211, 17], [216, 17], [218, 16], [222, 22], [225, 27], [228, 31], [226, 34], [224, 34], [226, 39], [228, 43], [230, 46], [236, 46], [242, 46], [243, 50], [245, 50], [247, 54], [247, 56], [248, 60], [248, 65], [253, 66], [255, 64], [260, 64], [264, 67], [268, 71], [272, 66], [275, 66], [281, 61], [285, 66], [286, 70], [292, 74], [294, 74], [296, 74], [296, 71], [301, 74], [307, 74], [311, 78], [315, 74], [315, 77], [319, 77], [322, 82], [328, 82], [331, 81], [331, 84], [333, 86], [333, 90], [330, 95], [326, 98], [328, 99], [332, 98], [333, 101], [331, 104], [329, 104], [327, 106], [329, 111], [332, 116], [333, 119], [333, 122], [332, 126], [332, 130], [327, 130], [321, 130], [317, 130], [315, 134], [312, 134], [308, 138], [306, 138], [306, 144], [306, 149], [306, 152], [301, 152], [297, 154], [295, 154], [292, 154], [292, 158], [288, 158], [283, 162], [281, 164], [279, 163], [276, 163], [273, 166], [272, 169], [268, 168], [265, 170], [260, 172], [256, 176], [252, 176], [248, 181], [246, 182], [246, 189], [246, 194], [248, 197], [250, 198], [252, 200], [252, 203], [254, 205], [260, 205], [264, 202], [267, 202], [269, 202], [272, 199], [280, 199], [278, 202], [278, 207], [278, 211], [276, 211], [272, 213], [268, 213], [265, 213], [264, 211], [262, 210], [260, 210], [257, 212], [257, 214], [255, 217], [253, 217], [253, 221], [249, 220], [247, 220], [243, 222], [240, 223], [239, 226], [234, 231], [229, 231], [224, 231], [219, 227], [220, 227], [222, 224], [222, 222], [222, 219], [224, 217], [222, 214], [220, 212], [217, 210], [215, 210], [211, 209], [208, 206], [202, 209], [202, 205], [206, 202], [211, 198], [216, 195], [220, 192], [224, 192], [221, 186], [218, 186], [214, 185], [208, 185], [204, 186], [200, 186], [193, 183], [190, 182], [188, 182], [190, 178], [186, 178], [184, 174], [182, 171], [178, 171], [173, 174], [169, 174], [169, 175], [169, 179], [167, 182], [164, 186], [160, 192], [155, 195], [152, 198], [150, 198], [148, 198], [148, 202], [151, 208], [148, 210], [146, 208], [144, 205], [140, 205], [137, 208], [132, 208], [132, 210], [127, 210], [124, 210], [120, 206], [120, 202], [123, 202], [124, 201], [124, 198], [128, 195], [131, 191], [133, 187], [135, 183], [130, 203], [129, 208], [123, 203], [129, 203], [129, 198], [133, 198], [136, 200], [142, 200], [143, 199], [143, 197], [137, 196], [136, 194], [133, 194], [136, 186], [136, 182], [141, 186], [144, 186], [150, 186], [150, 190], [155, 190], [159, 188], [156, 182], [151, 182], [144, 182], [164, 176], [161, 177], [157, 177], [166, 176], [168, 165], [175, 167], [180, 167], [188, 159], [195, 164], [195, 162], [187, 162], [178, 163], [173, 166], [168, 170], [156, 170], [157, 165], [164, 165], [164, 161], [170, 159], [167, 158], [159, 154], [149, 151], [145, 145], [145, 138], [152, 138], [152, 146], [159, 146], [165, 153], [176, 153], [180, 153], [187, 153], [194, 153], [202, 153], [202, 158], [197, 158], [193, 158], [193, 142], [180, 142], [171, 142], [163, 135], [176, 135], [186, 139], [201, 139], [206, 139], [205, 147], [205, 160], [198, 160], [206, 174], [205, 178], [196, 178], [196, 182], [202, 182], [206, 181], [209, 181], [215, 181], [222, 181], [230, 177], [238, 175], [241, 175], [237, 175], [237, 168], [237, 161], [232, 156], [231, 162], [225, 166], [217, 169], [210, 173], [224, 173], [227, 173], [235, 175], [237, 178], [228, 192], [222, 199], [216, 199], [211, 204], [205, 206], [219, 207], [222, 211], [229, 214], [236, 214], [244, 211], [247, 211], [268, 206], [277, 201], [279, 201], [281, 202], [278, 202], [242, 178], [236, 170], [236, 162], [255, 162], [251, 156], [240, 156], [253, 152], [261, 152], [277, 157], [268, 151], [255, 143], [260, 142], [267, 145], [271, 149], [273, 154], [258, 146], [257, 131], [256, 134], [248, 137], [260, 137], [260, 134], [271, 137], [276, 138], [276, 144], [289, 144], [285, 150], [294, 150], [298, 149], [301, 145], [292, 145], [282, 134], [276, 134], [283, 127], [282, 116], [277, 113], [283, 113], [288, 106], [296, 106], [297, 113], [297, 118], [298, 118], [310, 122], [310, 128], [300, 130], [300, 140], [292, 129], [292, 114], [283, 122], [289, 122], [299, 122], [299, 134], [294, 134], [288, 124], [314, 121], [311, 113], [308, 110], [304, 96], [299, 90], [299, 82], [305, 87], [309, 94], [311, 101], [312, 102], [314, 107], [320, 112], [320, 115], [326, 116], [323, 109], [321, 102], [321, 94], [321, 90], [328, 90], [328, 88], [316, 88], [316, 84], [307, 84], [290, 77], [289, 88], [289, 97], [278, 97], [268, 106], [268, 110], [261, 105], [255, 103], [244, 103], [252, 100], [252, 91], [252, 82], [242, 78], [252, 78], [259, 78], [264, 87], [267, 92], [272, 91], [272, 83], [264, 83], [260, 79], [276, 79], [283, 84], [283, 94], [289, 94], [284, 86], [272, 77], [253, 110], [248, 110], [239, 110], [234, 114], [222, 125], [219, 127], [219, 131], [219, 138], [219, 141], [224, 139], [224, 135], [225, 130], [232, 136], [240, 138], [237, 131], [237, 118], [248, 120], [256, 122], [262, 127], [255, 118], [245, 110], [207, 129], [199, 134], [195, 134], [188, 130], [180, 130], [165, 129], [156, 129], [165, 128], [173, 125], [185, 126], [193, 126], [201, 124], [204, 123], [208, 116], [214, 114], [207, 114], [196, 114], [183, 121], [183, 111], [189, 117], [196, 112], [172, 126], [164, 126], [159, 114], [174, 106], [186, 106], [192, 105], [184, 105], [184, 96], [173, 96], [163, 111], [159, 110], [152, 110], [168, 110], [171, 106], [183, 98], [193, 101], [219, 96], [225, 97], [225, 104], [232, 92], [240, 92], [237, 86], [229, 86], [216, 88], [214, 79], [203, 79], [203, 75], [212, 75], [221, 75], [229, 80], [230, 89], [217, 88], [217, 77], [228, 77], [228, 69], [235, 71], [240, 71], [244, 66], [236, 54], [236, 62], [232, 68], [229, 61], [216, 61], [212, 58], [212, 47], [212, 39], [214, 28], [215, 48], [225, 55], [236, 55], [202, 65], [202, 54], [202, 44], [202, 24], [198, 32], [199, 38], [192, 38], [185, 38], [174, 42], [174, 48], [178, 51], [184, 51], [194, 55], [191, 68], [182, 68], [174, 69], [167, 67], [153, 59], [153, 49], [147, 49], [152, 58], [152, 74], [154, 83], [161, 83], [165, 88], [153, 97], [153, 89], [152, 82], [168, 88], [168, 101], [156, 102], [156, 119], [173, 110], [184, 110], [177, 106], [160, 106], [145, 125], [137, 122], [131, 120], [124, 120], [122, 118], [113, 118], [114, 111], [129, 111], [140, 110], [143, 106], [137, 102], [127, 102], [119, 98], [126, 93], [139, 93], [139, 99], [141, 95], [128, 89], [118, 74], [128, 76], [135, 76], [141, 83], [141, 71], [137, 61], [137, 50], [129, 50], [118, 50], [109, 52], [112, 61], [123, 60], [134, 60], [129, 76], [121, 67], [124, 76], [123, 76], [111, 74], [128, 73], [109, 83], [109, 94], [105, 103], [102, 118], [92, 113], [98, 105], [99, 93], [94, 93], [94, 81], [99, 81], [100, 73], [100, 89], [100, 60], [100, 55], [105, 37], [101, 34], [93, 37], [90, 37], [90, 49], [99, 49], [88, 68], [80, 68], [78, 64], [88, 62], [86, 77], [76, 89], [71, 91], [71, 106], [78, 106], [82, 118], [84, 110], [71, 104], [76, 103], [76, 91], [78, 83], [85, 89], [83, 103], [83, 119], [76, 130], [62, 130], [68, 127], [74, 126], [83, 123], [62, 123], [56, 123], [59, 129], [59, 120], [49, 110], [46, 106], [56, 100], [62, 94], [62, 109], [72, 112], [67, 112], [57, 112], [61, 122], [60, 102], [52, 125], [44, 121], [36, 114], [32, 110], [20, 110], [22, 118], [35, 118], [44, 124], [32, 119], [22, 111], [44, 96], [36, 106], [36, 94], [32, 94], [35, 83], [44, 91], [52, 91], [52, 80], [59, 80], [62, 76], [62, 70], [47, 78], [55, 75], [64, 71], [64, 60], [58, 53], [58, 43], [65, 43], [65, 60], [76, 52], [73, 38], [76, 36], [93, 48], [89, 39], [99, 40], [98, 50], [94, 63], [117, 63], [131, 67], [131, 74], [142, 78], [140, 61], [124, 58], [124, 48], [136, 55], [236, 200], [228, 200], [226, 192], [232, 198], [238, 210], [248, 210], [236, 220], [230, 223], [230, 213], [175, 32], [172, 32], [171, 38], [184, 30]];
var triangles = [623, 636, 619, 636, 444, 619, 619, 632, 623, 618, 624, 619, 624, 632, 619, 622, 620, 636, 636, 620, 444, 637, 636, 623, 637, 622, 636, 622, 637, 620, 648, 637, 623, 445, 618, 619, 624, 634, 632, 442, 441, 444, 444, 445, 619, 443, 442, 444, 621, 443, 620, 620, 443, 444, 441, 445, 444, 617, 625, 618, 618, 625, 624, 625, 634, 624, 632, 718, 623, 633, 718, 632, 634, 633, 632, 717, 621, 637, 637, 621, 620, 443, 430, 442, 445, 617, 618, 718, 648, 623, 634, 719, 633, 633, 720, 718, 648, 645, 637, 434, 440, 445, 445, 440, 617, 638, 717, 637, 645, 638, 637, 719, 720, 633, 718, 649, 648, 648, 721, 645, 720, 639, 718, 639, 649, 718, 446, 616, 617, 617, 616, 625, 625, 631, 634, 428, 430, 443, 442, 432, 441, 441, 434, 445, 431, 432, 442, 432, 433, 441, 635, 719, 634, 641, 640, 719, 719, 642, 720, 721, 646, 645, 645, 646, 638, 638, 647, 717, 626, 631, 625, 640, 642, 719, 644, 715, 639, 639, 715, 649, 722, 428, 621, 621, 428, 443, 616, 626, 625, 630, 635, 631, 631, 635, 634, 424, 431, 430, 430, 431, 442, 433, 434, 441, 440, 446, 617, 448, 446, 440, 615, 627, 626, 715, 648, 649, 715, 721, 648, 646, 647, 638, 644, 639, 720, 635, 641, 719, 640, 650, 642, 642, 650, 720, 615, 626, 616, 626, 627, 631, 635, 651, 641, 428, 429, 430, 716, 647, 721, 721, 647, 646, 717, 722, 621, 429, 424, 430, 431, 422, 432, 432, 415, 433, 433, 411, 434, 439, 435, 434, 434, 435, 440, 421, 423, 431, 423, 422, 431, 647, 722, 717, 428, 426, 429, 447, 616, 446, 447, 615, 616, 651, 650, 640, 448, 447, 446, 722, 427, 428, 630, 651, 635, 641, 651, 640, 415, 411, 433, 650, 644, 720, 715, 716, 721, 711, 716, 710, 651, 643, 650, 650, 643, 644, 411, 439, 434, 435, 448, 440, 425, 424, 429, 420, 421, 419, 424, 421, 431, 423, 421, 422, 422, 415, 432, 416, 415, 422, 411, 413, 439, 436, 448, 435, 628, 630, 627, 627, 630, 631, 615, 628, 627, 427, 426, 428, 426, 425, 429, 415, 414, 411, 438, 435, 439, 438, 436, 435, 450, 438, 413, 722, 76, 427, 427, 75, 426, 70, 68, 425, 420, 408, 421, 421, 408, 422, 415, 410, 414, 408, 416, 422, 722, 77, 76, 76, 75, 427, 77, 75, 76, 419, 421, 424, 349, 409, 416, 417, 416, 408, 416, 409, 415, 413, 438, 439, 413, 411, 414, 438, 437, 436, 412, 413, 414, 409, 410, 415, 710, 716, 715, 716, 731, 647, 730, 723, 722, 81, 80, 77, 79, 74, 75, 75, 74, 426, 425, 67, 424, 730, 722, 647, 449, 437, 450, 450, 437, 438, 436, 449, 448, 70, 425, 426, 711, 731, 716, 80, 78, 77, 77, 78, 75, 731, 730, 647, 346, 412, 414, 413, 412, 450, 66, 419, 424, 420, 417, 408, 71, 426, 74, 71, 70, 426, 68, 67, 425, 69, 67, 68, 599, 615, 600, 599, 628, 615, 599, 629, 628, 628, 629, 630, 630, 652, 651, 70, 69, 68, 643, 714, 644, 644, 714, 715, 73, 71, 74, 70, 72, 69, 80, 79, 78, 78, 79, 75, 404, 417, 420, 409, 348, 410, 410, 347, 414, 714, 710, 715, 79, 73, 74, 65, 66, 69, 349, 348, 409, 348, 347, 410, 451, 449, 412, 412, 449, 450, 437, 449, 436, 600, 615, 601, 81, 722, 723, 81, 77, 722, 84, 72, 73, 72, 70, 71, 69, 66, 67, 67, 66, 424, 84, 73, 79, 73, 72, 71, 615, 447, 601, 601, 447, 602, 724, 81, 723, 602, 447, 448, 449, 602, 448, 72, 65, 69, 66, 62, 419, 419, 418, 420, 64, 62, 66, 350, 349, 417, 417, 349, 416, 348, 346, 347, 729, 724, 730, 730, 724, 723, 710, 712, 711, 737, 732, 731, 731, 732, 730, 61, 418, 419, 407, 350, 417, 63, 61, 62, 62, 61, 419, 349, 346, 348, 347, 346, 414, 65, 64, 66, 64, 63, 62, 604, 600, 601, 605, 599, 600, 605, 598, 599, 599, 598, 629, 724, 82, 81, 81, 82, 80, 80, 84, 79, 407, 351, 350, 350, 351, 349, 349, 345, 346, 737, 731, 738, 738, 731, 711, 63, 60, 61, 61, 60, 418, 404, 407, 417, 85, 83, 82, 82, 83, 80, 701, 714, 700, 701, 709, 714, 714, 709, 710, 710, 709, 712, 712, 738, 711, 404, 420, 418, 351, 352, 349, 736, 738, 743, 735, 733, 732, 603, 601, 602, 603, 604, 601, 405, 404, 418, 604, 605, 600, 604, 606, 605, 466, 603, 602, 733, 729, 732, 732, 729, 730, 724, 85, 82, 2, 1, 407, 407, 1, 351, 352, 345, 349, 346, 344, 412, 406, 405, 418, 404, 2, 407, 709, 708, 712, 2, 352, 1, 1, 352, 351, 0, 2, 404, 55, 63, 53, 55, 60, 63, 55, 59, 60, 60, 59, 418, 743, 738, 712, 738, 736, 737, 343, 344, 345, 345, 344, 346, 449, 468, 602, 59, 58, 418, 353, 0, 404, 725, 85, 724, 83, 84, 80, 53, 50, 52, 56, 58, 59, 85, 84, 83, 58, 406, 418, 3, 0, 353, 2, 0, 352, 4, 343, 345, 707, 713, 708, 708, 713, 712, 729, 725, 724, 725, 86, 85, 85, 86, 84, 353, 404, 405, 0, 3, 352, 341, 453, 344, 344, 453, 412, 63, 50, 53, 56, 57, 58, 58, 57, 406, 5, 353, 7, 5, 7, 6, 4, 345, 352, 654, 629, 597, 654, 652, 629, 629, 652, 630, 651, 661, 643, 453, 451, 412, 728, 726, 729, 729, 726, 725, 725, 87, 86, 4, 352, 3, 453, 452, 451, 64, 50, 63, 405, 7, 353, 5, 4, 353, 353, 4, 3, 405, 8, 7, 55, 56, 59, 597, 629, 598, 341, 342, 343, 343, 342, 344, 735, 737, 736, 735, 732, 737, 405, 406, 401, 5, 6, 4, 4, 6, 343, 452, 470, 451, 451, 470, 449, 401, 406, 57, 659, 661, 651, 709, 707, 708, 466, 606, 603, 603, 606, 604, 609, 597, 598, 402, 57, 56, 402, 401, 57, 65, 49, 50, 64, 65, 50, 55, 54, 56, 340, 330, 339, 342, 341, 344, 53, 54, 55, 341, 454, 453, 667, 659, 652, 652, 659, 651, 713, 743, 712, 455, 452, 453, 88, 87, 726, 726, 87, 725, 86, 87, 84, 458, 469, 470, 470, 469, 449, 653, 667, 652, 663, 662, 661, 65, 72, 49, 53, 403, 54, 54, 402, 56, 49, 72, 48, 8, 405, 401, 8, 354, 7, 7, 354, 6, 6, 9, 343, 655, 653, 654, 654, 653, 652, 403, 402, 54, 10, 8, 400, 50, 51, 52, 52, 51, 53, 340, 455, 454, 454, 455, 453, 452, 457, 470, 702, 707, 709, 713, 856, 743, 700, 714, 643, 727, 88, 726, 48, 72, 84, 609, 598, 605, 660, 661, 659, 699, 700, 643, 48, 84, 99, 50, 49, 51, 10, 9, 8, 8, 9, 354, 354, 9, 6, 341, 340, 454, 455, 456, 452, 707, 856, 713, 739, 735, 736, 699, 643, 661, 400, 401, 399, 400, 8, 401, 739, 736, 743, 728, 727, 726, 607, 608, 606, 606, 608, 605, 403, 53, 51, 397, 401, 402, 471, 468, 469, 469, 468, 449, 742, 739, 743, 394, 403, 51, 339, 456, 455, 338, 457, 456, 456, 457, 452, 608, 609, 605, 597, 596, 654, 696, 702, 701, 701, 702, 709, 744, 742, 856, 340, 329, 330, 662, 699, 661, 706, 703, 704, 468, 466, 602, 668, 660, 667, 667, 660, 659, 662, 686, 699, 403, 397, 402, 92, 84, 87, 49, 48, 51, 398, 399, 397, 728, 733, 734, 728, 729, 733, 88, 90, 87, 338, 331, 332, 340, 339, 455, 492, 467, 468, 727, 89, 88, 734, 733, 735, 727, 90, 89, 399, 11, 400, 400, 11, 10, 10, 11, 9, 329, 341, 343, 760, 734, 759, 458, 470, 457, 468, 467, 466, 466, 607, 606, 396, 397, 403, 397, 399, 401, 668, 663, 660, 660, 663, 661, 339, 338, 456, 496, 607, 466, 610, 614, 609, 12, 355, 11, 11, 355, 9, 40, 42, 378, 48, 47, 51, 337, 458, 457, 395, 396, 403, 399, 12, 11, 458, 471, 469, 614, 596, 609, 609, 596, 597, 665, 668, 667, 666, 667, 653, 47, 394, 51, 14, 398, 359, 396, 398, 397, 744, 856, 707, 856, 742, 743, 759, 734, 735, 13, 12, 399, 331, 339, 330, 90, 727, 762, 91, 90, 762, 89, 90, 88, 394, 395, 403, 596, 655, 654, 655, 666, 653, 356, 13, 14, 14, 13, 399, 703, 744, 707, 40, 41, 42, 47, 46, 394, 394, 45, 395, 460, 472, 471, 471, 472, 468, 467, 493, 466, 46, 379, 394, 379, 45, 394, 14, 399, 398, 336, 332, 333, 336, 337, 332, 338, 337, 457, 458, 459, 471, 657, 658, 666, 666, 658, 667, 664, 663, 668, 678, 686, 663, 663, 686, 662, 699, 698, 700, 464, 493, 467, 464, 465, 493, 493, 465, 466, 14, 359, 16, 13, 356, 12, 12, 361, 355, 44, 45, 379, 44, 393, 45, 45, 393, 395, 336, 459, 458, 492, 464, 467, 465, 496, 466, 665, 664, 668, 855, 753, 742, 742, 753, 739, 357, 14, 16, 854, 855, 742, 378, 44, 46, 46, 44, 379, 393, 43, 395, 727, 728, 762, 92, 91, 762, 90, 92, 87, 758, 741, 753, 753, 741, 739, 337, 338, 332, 337, 336, 458, 509, 608, 607, 610, 609, 608, 596, 575, 655, 657, 665, 658, 657, 666, 655, 658, 665, 667, 42, 41, 377, 44, 43, 393, 475, 460, 459, 459, 460, 471, 465, 495, 496, 497, 509, 607, 509, 610, 608, 492, 468, 472, 497, 501, 509, 595, 575, 614, 614, 575, 596, 333, 335, 336, 336, 335, 459, 473, 492, 472, 703, 702, 178, 702, 703, 707, 854, 758, 855, 855, 758, 753, 398, 17, 359, 14, 357, 356, 356, 361, 12, 854, 742, 744, 741, 755, 739, 378, 43, 44, 671, 669, 665, 665, 669, 664, 687, 698, 686, 758, 755, 741, 762, 728, 761, 91, 92, 90, 398, 389, 17, 575, 656, 655, 761, 728, 734, 46, 40, 378, 378, 42, 43, 398, 396, 389, 758, 756, 755, 755, 756, 739, 696, 701, 700, 703, 857, 744, 754, 740, 756, 396, 395, 389, 610, 595, 614, 575, 576, 656, 656, 657, 655, 389, 395, 391, 759, 735, 739, 760, 761, 734, 463, 473, 474, 460, 473, 472, 492, 462, 464, 494, 495, 465, 391, 395, 43, 94, 93, 762, 762, 93, 92, 92, 95, 84, 678, 663, 664, 686, 698, 699, 745, 854, 744, 392, 391, 43, 706, 857, 703, 46, 47, 40, 42, 377, 43, 461, 463, 474, 473, 463, 492, 40, 47, 48, 377, 392, 43, 338, 339, 331, 475, 474, 460, 390, 389, 391, 387, 388, 389, 389, 388, 17, 17, 360, 359, 359, 360, 16, 16, 360, 357, 341, 329, 340, 9, 329, 343, 392, 390, 391, 474, 473, 460, 463, 461, 492, 697, 696, 700, 752, 745, 860, 9, 355, 329, 745, 857, 860, 857, 745, 744, 41, 392, 377, 698, 697, 700, 387, 389, 390, 387, 360, 388, 388, 360, 17, 475, 459, 335, 670, 664, 669, 670, 678, 664, 698, 692, 697, 763, 94, 762, 93, 95, 92, 386, 387, 390, 99, 40, 48, 41, 376, 392, 392, 385, 390, 679, 687, 686, 329, 355, 328, 863, 334, 476, 671, 670, 669, 754, 758, 854, 754, 756, 758, 756, 759, 739, 683, 679, 678, 678, 679, 686, 613, 595, 610, 613, 594, 595, 595, 576, 575, 578, 579, 657, 579, 671, 665, 333, 332, 476, 476, 334, 333, 333, 334, 335, 507, 610, 509, 611, 613, 610, 491, 462, 474, 474, 462, 461, 461, 462, 492, 494, 465, 464, 860, 857, 705, 745, 752, 854, 501, 508, 509, 507, 611, 610, 497, 607, 496, 694, 696, 697, 694, 695, 696, 696, 695, 702, 96, 95, 94, 94, 95, 93, 361, 356, 357, 477, 332, 331, 495, 497, 496, 740, 759, 756, 765, 764, 761, 761, 764, 762, 477, 331, 478, 334, 863, 335, 478, 331, 330, 765, 761, 760, 364, 360, 387, 364, 18, 360, 360, 361, 357, 511, 507, 508, 508, 507, 509, 384, 385, 392, 38, 39, 40, 40, 39, 41, 574, 594, 573, 574, 595, 594, 574, 576, 595, 385, 386, 390, 39, 376, 41, 385, 380, 386, 862, 475, 863, 863, 475, 335, 751, 754, 854, 740, 757, 759, 365, 364, 387, 279, 491, 474, 462, 494, 464, 498, 506, 497, 100, 38, 40, 39, 38, 376, 376, 384, 392, 23, 22, 364, 361, 360, 18, 328, 479, 329, 329, 479, 330, 477, 476, 332, 579, 665, 657, 670, 677, 678, 671, 676, 670, 177, 704, 703, 752, 751, 854, 21, 361, 18, 365, 387, 386, 364, 22, 18, 327, 478, 330, 694, 178, 695, 695, 178, 702, 572, 613, 611, 573, 594, 613, 578, 657, 656, 577, 656, 576, 37, 384, 376, 705, 857, 706, 763, 96, 94, 95, 98, 84, 328, 327, 479, 479, 327, 330, 178, 177, 703, 704, 705, 706, 363, 18, 22, 363, 21, 18, 494, 497, 495, 497, 506, 501, 510, 511, 508, 480, 477, 478, 480, 476, 477, 280, 279, 474, 24, 365, 25, 365, 23, 364, 510, 508, 501, 507, 612, 611, 19, 328, 361, 361, 328, 355, 770, 760, 759, 770, 765, 760, 764, 763, 762, 174, 705, 704, 853, 740, 754, 853, 757, 740, 23, 363, 22, 21, 19, 361, 502, 510, 501, 789, 763, 795, 583, 577, 576, 25, 365, 386, 365, 24, 23, 23, 366, 363, 362, 21, 363, 362, 19, 21, 506, 502, 501, 768, 770, 759, 765, 766, 764, 375, 37, 38, 38, 37, 376, 26, 25, 386, 366, 362, 363, 380, 385, 384, 24, 366, 23, 277, 494, 462, 506, 503, 502, 672, 671, 579, 675, 676, 671, 675, 677, 676, 676, 677, 670, 680, 688, 687, 512, 511, 510, 512, 612, 511, 511, 612, 507, 583, 582, 577, 580, 672, 579, 36, 375, 34, 383, 380, 384, 858, 752, 747, 858, 751, 752, 763, 97, 96, 96, 98, 95, 688, 698, 687, 693, 694, 697, 178, 179, 177, 177, 175, 704, 383, 384, 374, 25, 366, 24, 380, 26, 386, 694, 179, 178, 746, 860, 705, 747, 752, 860, 751, 853, 754, 172, 746, 705, 99, 98, 801, 97, 98, 96, 320, 321, 322, 328, 326, 327, 327, 326, 478, 374, 384, 37, 367, 27, 26, 748, 853, 751, 767, 766, 770, 27, 366, 26, 26, 366, 25, 862, 863, 476, 280, 474, 475, 491, 277, 462, 500, 498, 273, 494, 498, 497, 502, 503, 510, 480, 862, 476, 572, 573, 613, 577, 578, 656, 685, 684, 677, 677, 684, 678, 680, 687, 679, 36, 374, 375, 375, 374, 37, 367, 26, 380, 768, 759, 769, 770, 766, 765, 801, 98, 97, 180, 176, 179, 179, 176, 177, 280, 278, 279, 279, 278, 491, 861, 864, 862, 862, 864, 475, 683, 680, 679, 581, 578, 587, 672, 675, 671, 34, 375, 38, 374, 382, 383, 325, 480, 478, 684, 683, 678, 278, 277, 491, 673, 675, 672, 684, 201, 683, 367, 380, 381, 366, 27, 362, 176, 175, 177, 769, 759, 757, 34, 373, 36, 36, 373, 374, 323, 320, 322, 326, 325, 478, 865, 861, 862, 872, 179, 694, 872, 180, 179, 176, 181, 175, 28, 367, 381, 801, 97, 796, 98, 99, 84, 870, 872, 694, 34, 382, 373, 373, 382, 374, 692, 698, 688, 692, 693, 697, 325, 324, 480, 174, 704, 175, 174, 172, 705, 746, 747, 860, 748, 750, 853, 168, 747, 746, 853, 750, 757, 581, 580, 578, 578, 580, 579, 173, 170, 171, 181, 174, 175, 381, 380, 383, 367, 368, 27, 27, 29, 362, 382, 381, 383, 100, 34, 38, 31, 369, 381, 691, 688, 681, 691, 692, 688, 29, 368, 28, 28, 368, 367, 281, 280, 864, 864, 280, 475, 278, 276, 277, 580, 673, 672, 675, 685, 677, 275, 494, 277, 500, 503, 498, 498, 503, 506, 612, 572, 611, 796, 97, 763, 171, 170, 169, 174, 173, 172, 172, 171, 746, 748, 751, 858, 763, 764, 795, 789, 796, 763, 280, 276, 278, 481, 862, 480, 795, 764, 766, 681, 680, 683, 681, 688, 680, 104, 33, 34, 34, 33, 382, 381, 29, 28, 369, 29, 381, 368, 29, 27, 315, 316, 19, 325, 320, 323, 325, 323, 324, 750, 769, 757, 768, 767, 770, 525, 572, 612, 583, 576, 574, 789, 788, 796, 796, 788, 801, 319, 320, 316, 324, 323, 480, 323, 481, 480, 769, 767, 768, 31, 381, 382, 274, 275, 276, 276, 275, 277, 181, 176, 180, 173, 171, 172, 747, 859, 858, 273, 498, 494, 503, 512, 510, 572, 571, 573, 208, 685, 675, 104, 371, 33, 33, 371, 382, 870, 693, 873, 870, 694, 693, 871, 181, 872, 872, 181, 180, 31, 30, 369, 369, 30, 29, 316, 320, 325, 513, 512, 514, 572, 525, 571, 166, 859, 747, 750, 771, 769, 797, 99, 801, 797, 100, 99, 99, 100, 40, 205, 674, 685, 685, 674, 684, 282, 281, 861, 861, 281, 864, 280, 283, 276, 104, 32, 371, 371, 32, 382, 794, 795, 766, 789, 811, 788, 800, 797, 801, 32, 31, 382, 211, 210, 580, 580, 210, 673, 673, 209, 675, 873, 693, 692, 870, 871, 872, 200, 681, 683, 186, 873, 692, 173, 174, 170, 169, 168, 171, 171, 168, 746, 318, 319, 316, 323, 322, 481, 481, 869, 862, 505, 504, 500, 500, 504, 503, 582, 578, 577, 163, 748, 859, 859, 748, 858, 583, 574, 573, 582, 587, 578, 581, 211, 580, 170, 174, 181, 168, 166, 747, 584, 583, 570, 571, 583, 573, 582, 586, 587, 272, 274, 291, 275, 274, 494, 203, 202, 674, 674, 202, 684, 783, 767, 779, 783, 794, 767, 767, 794, 766, 690, 692, 691, 183, 182, 871, 183, 871, 870, 871, 182, 181, 682, 690, 681, 681, 690, 691, 182, 170, 181, 169, 167, 168, 585, 586, 582, 212, 211, 213, 283, 285, 284, 281, 283, 280, 211, 214, 213, 210, 209, 673, 787, 789, 795, 800, 801, 788, 100, 103, 34, 211, 209, 210, 791, 787, 795, 482, 869, 481, 271, 273, 272, 274, 273, 494, 203, 201, 202, 202, 201, 684, 512, 503, 514, 513, 522, 512, 512, 522, 612, 273, 505, 500, 322, 482, 481, 484, 282, 861, 170, 167, 169, 316, 325, 326, 322, 321, 482, 514, 503, 504, 505, 514, 504, 321, 868, 482, 328, 316, 326, 161, 749, 748, 748, 749, 750, 865, 862, 869, 282, 283, 281, 811, 800, 788, 212, 209, 211, 212, 208, 209, 209, 208, 675, 749, 771, 750, 205, 203, 674, 211, 581, 214, 165, 167, 170, 165, 166, 167, 167, 166, 168, 483, 869, 482, 483, 865, 869, 521, 522, 513, 524, 525, 538, 538, 525, 612, 583, 584, 582, 203, 200, 201, 201, 200, 683, 792, 795, 794, 792, 791, 795, 787, 811, 789, 212, 207, 208, 208, 205, 685, 570, 583, 571, 214, 581, 215, 779, 767, 769, 187, 186, 690, 690, 186, 692, 873, 184, 870, 207, 205, 208, 197, 198, 200, 102, 101, 799, 800, 101, 797, 797, 101, 100, 328, 19, 316, 320, 319, 321, 272, 273, 274, 273, 271, 505, 505, 516, 514, 291, 274, 276, 285, 282, 866, 285, 283, 282, 283, 288, 276, 867, 483, 482, 185, 184, 873, 182, 183, 170, 184, 183, 870, 772, 771, 749, 772, 852, 771, 771, 852, 769, 213, 206, 207, 207, 206, 205, 205, 204, 203, 786, 787, 791, 786, 811, 787, 188, 185, 186, 186, 185, 873, 270, 505, 271, 270, 499, 505, 514, 521, 513, 851, 772, 778, 206, 204, 205, 19, 362, 315, 319, 868, 321, 183, 165, 170, 166, 163, 859, 269, 271, 268, 269, 270, 271, 215, 587, 593, 212, 213, 207, 206, 218, 204, 198, 199, 200, 200, 199, 681, 516, 505, 499, 515, 521, 514, 588, 585, 589, 784, 794, 793, 784, 792, 794, 484, 865, 483, 484, 861, 865, 284, 288, 283, 570, 571, 525, 584, 585, 582, 782, 779, 852, 852, 779, 769, 799, 101, 800, 101, 103, 100, 160, 164, 165, 165, 164, 166, 310, 484, 483, 538, 612, 522, 790, 786, 791, 811, 799, 800, 527, 570, 525, 197, 200, 203, 199, 682, 681, 164, 163, 166, 793, 794, 783, 785, 790, 791, 521, 523, 522, 315, 362, 29, 318, 868, 319, 785, 791, 792, 812, 799, 811, 523, 538, 522, 812, 811, 786, 196, 682, 199, 215, 581, 587, 213, 218, 206, 780, 793, 783, 316, 317, 318, 682, 689, 690, 537, 526, 524, 524, 526, 525, 485, 866, 484, 484, 866, 282, 268, 271, 272, 315, 868, 318, 593, 586, 585, 593, 587, 586, 286, 284, 285, 270, 269, 499, 536, 543, 523, 309, 485, 484, 585, 584, 589, 588, 593, 585, 164, 162, 163, 163, 162, 748, 777, 782, 852, 287, 286, 302, 866, 286, 285, 188, 187, 189, 689, 187, 690, 185, 188, 184, 184, 188, 183, 868, 867, 482, 785, 792, 784, 810, 786, 790, 810, 812, 786, 777, 852, 772, 779, 780, 783, 189, 187, 689, 187, 188, 186, 778, 772, 749, 773, 778, 749, 196, 197, 195, 204, 197, 203, 198, 197, 199, 190, 189, 689, 103, 102, 798, 104, 103, 798, 102, 103, 101, 292, 268, 272, 269, 267, 499, 190, 689, 682, 809, 785, 834, 793, 785, 784, 266, 516, 499, 523, 543, 538, 538, 539, 524, 773, 161, 160, 160, 161, 162, 162, 161, 748, 590, 584, 570, 217, 216, 215, 191, 190, 682, 798, 102, 799, 103, 104, 34, 266, 267, 265, 268, 267, 269, 536, 523, 521, 569, 590, 570, 527, 525, 526, 216, 214, 215, 216, 213, 214, 195, 197, 218, 197, 196, 199, 30, 315, 29, 316, 315, 317, 317, 315, 318, 312, 311, 867, 303, 866, 306, 303, 286, 866, 781, 780, 782, 782, 780, 779, 536, 539, 543, 543, 539, 538, 802, 799, 812, 802, 798, 799, 310, 483, 867, 286, 287, 284, 814, 802, 812, 312, 867, 868, 520, 515, 516, 516, 515, 514, 537, 527, 526, 289, 288, 486, 287, 288, 284, 805, 814, 812, 802, 804, 798, 589, 584, 592, 217, 593, 588, 217, 215, 593, 312, 310, 311, 311, 310, 867, 815, 790, 809, 815, 810, 790, 315, 314, 868, 850, 848, 778, 778, 848, 851, 851, 777, 772, 160, 162, 164, 161, 773, 749, 308, 309, 310, 310, 309, 484, 192, 191, 682, 190, 191, 189, 189, 191, 188, 188, 191, 183, 159, 160, 157, 265, 267, 268, 267, 266, 499, 313, 312, 868, 592, 584, 590, 218, 197, 204, 196, 195, 682, 542, 521, 515, 542, 536, 521, 539, 537, 524, 568, 592, 590, 306, 866, 485, 159, 157, 158, 849, 777, 848, 803, 802, 814, 803, 804, 802, 798, 105, 104, 850, 778, 773, 848, 777, 851, 813, 805, 812, 193, 192, 682, 307, 308, 310, 309, 308, 485, 486, 288, 287, 288, 291, 276, 845, 781, 782, 839, 835, 793, 304, 302, 303, 303, 302, 286, 774, 850, 773, 530, 537, 539, 527, 569, 570, 308, 306, 485, 220, 588, 567, 220, 217, 588, 216, 218, 213, 517, 520, 516, 528, 569, 527, 592, 568, 589, 314, 313, 868, 312, 307, 310, 306, 304, 303, 302, 301, 287, 106, 798, 804, 106, 105, 798, 104, 105, 32, 520, 542, 515, 540, 530, 539, 548, 591, 569, 569, 591, 590, 304, 301, 302, 486, 290, 289, 289, 291, 288, 809, 790, 785, 813, 803, 805, 816, 106, 804, 194, 193, 195, 195, 193, 682, 307, 306, 308, 307, 305, 306, 306, 305, 304, 299, 300, 301, 835, 785, 793, 265, 264, 266, 266, 264, 516, 535, 541, 542, 487, 291, 290, 290, 291, 289, 803, 814, 805, 813, 812, 810, 808, 813, 815, 815, 813, 810, 292, 265, 268, 264, 517, 516, 263, 517, 264, 218, 194, 195, 193, 194, 192, 192, 194, 191, 548, 568, 591, 591, 568, 590, 313, 307, 312, 299, 301, 304, 301, 486, 287, 300, 486, 301, 159, 773, 160, 159, 774, 773, 850, 775, 848, 777, 845, 782, 299, 304, 305, 160, 165, 157, 539, 536, 540, 531, 530, 540, 537, 528, 527, 262, 263, 265, 265, 263, 264, 535, 542, 520, 530, 529, 537, 529, 528, 537, 534, 536, 542, 530, 531, 529, 547, 569, 528, 307, 299, 305, 300, 298, 486, 294, 487, 290, 261, 262, 260, 832, 808, 809, 809, 808, 815, 817, 816, 803, 158, 775, 774, 774, 775, 850, 839, 793, 780, 518, 520, 517, 534, 540, 536, 547, 528, 546, 806, 803, 813, 803, 816, 804, 816, 107, 106, 106, 107, 105, 105, 110, 32, 292, 272, 291, 263, 262, 517, 262, 518, 517, 257, 534, 541, 541, 534, 542, 293, 487, 294, 775, 849, 848, 816, 108, 107, 107, 108, 105, 519, 520, 518, 519, 535, 520, 567, 589, 568, 567, 588, 589, 217, 218, 216, 307, 298, 299, 299, 298, 300, 219, 218, 217, 839, 780, 781, 158, 776, 775, 775, 776, 849, 836, 839, 844, 221, 567, 222, 220, 219, 217, 845, 777, 849, 847, 845, 849, 488, 292, 487, 487, 292, 291, 294, 290, 486, 224, 219, 220, 489, 488, 293, 293, 488, 487, 261, 518, 262, 261, 519, 518, 535, 257, 541, 838, 834, 835, 835, 834, 785, 110, 109, 823, 260, 262, 265, 157, 165, 183, 159, 158, 774, 840, 844, 841, 806, 813, 808, 816, 109, 108, 108, 109, 105, 844, 839, 781, 839, 836, 835, 295, 297, 307, 307, 297, 298, 298, 297, 486, 832, 809, 834, 807, 806, 808, 294, 489, 293, 488, 489, 292, 292, 260, 265, 548, 569, 547, 549, 567, 568, 567, 221, 220, 219, 224, 218, 296, 294, 486, 533, 540, 534, 529, 531, 546, 528, 529, 546, 833, 832, 834, 297, 296, 486, 294, 295, 489, 844, 843, 841, 845, 844, 781, 836, 838, 835, 549, 222, 567, 221, 224, 220, 258, 535, 519, 258, 257, 535, 847, 849, 776, 844, 840, 836, 259, 519, 261, 259, 258, 519, 313, 295, 307, 297, 295, 296, 296, 295, 294, 260, 259, 261, 826, 808, 832, 826, 807, 808, 823, 109, 816, 823, 816, 817, 109, 110, 105, 817, 803, 806, 550, 549, 548, 548, 549, 568, 818, 817, 806, 260, 292, 489, 138, 838, 836, 549, 223, 222, 222, 224, 221, 251, 260, 250, 546, 531, 545, 156, 157, 155, 155, 157, 183, 158, 157, 776, 256, 258, 254, 255, 256, 254, 258, 256, 257, 257, 533, 534, 838, 833, 834, 225, 223, 549, 225, 224, 223, 223, 224, 222, 218, 228, 194, 532, 531, 540, 255, 257, 256, 255, 533, 257, 533, 532, 540, 112, 823, 822, 112, 111, 823, 823, 111, 110, 110, 113, 32, 831, 826, 832, 113, 112, 114, 551, 547, 552, 551, 550, 547, 547, 550, 548, 156, 847, 776, 137, 837, 838, 837, 831, 833, 544, 545, 532, 532, 545, 531, 254, 258, 259, 533, 544, 532, 566, 225, 549, 224, 228, 218, 837, 833, 838, 833, 831, 832, 818, 806, 807, 847, 846, 845, 155, 183, 191, 157, 156, 776, 847, 153, 846, 818, 807, 827, 111, 113, 110, 552, 547, 546, 550, 566, 549, 553, 546, 554, 553, 552, 546, 138, 836, 840, 253, 544, 533, 226, 566, 227, 564, 566, 550, 554, 546, 545, 560, 564, 551, 252, 254, 251, 260, 254, 259, 255, 253, 533, 843, 844, 845, 842, 843, 150, 846, 843, 845, 556, 545, 544, 555, 554, 545, 227, 566, 565, 139, 138, 840, 827, 826, 828, 827, 807, 826, 822, 823, 817, 112, 113, 111, 818, 822, 817, 252, 253, 254, 254, 253, 255, 828, 831, 830, 828, 826, 831, 818, 824, 822, 141, 139, 841, 841, 139, 840, 138, 137, 838, 154, 155, 191, 156, 155, 847, 142, 141, 841, 550, 551, 564, 566, 226, 225, 225, 226, 224, 139, 137, 138, 140, 141, 142, 139, 140, 137, 824, 114, 822, 822, 114, 112, 829, 828, 830, 819, 824, 818, 819, 818, 827, 559, 553, 554, 551, 552, 560, 128, 819, 827, 252, 556, 544, 556, 555, 545, 842, 841, 843, 141, 140, 139, 137, 136, 837, 251, 254, 260, 253, 252, 544, 558, 554, 555, 150, 843, 846, 116, 115, 824, 824, 115, 114, 114, 115, 113, 113, 117, 32, 140, 136, 137, 153, 154, 191, 155, 154, 847, 560, 552, 553, 561, 565, 564, 564, 565, 566, 143, 142, 842, 842, 142, 841, 140, 144, 136, 558, 555, 557, 558, 559, 554, 830, 831, 837, 828, 829, 827, 117, 116, 118, 135, 837, 136, 135, 830, 837, 230, 229, 565, 565, 229, 227, 227, 228, 226, 226, 228, 224, 557, 555, 556, 559, 560, 553, 116, 119, 118, 115, 116, 113, 144, 135, 136, 238, 560, 559, 230, 228, 229, 229, 228, 227, 129, 829, 131, 129, 128, 829, 829, 128, 827, 194, 153, 191, 154, 153, 847, 562, 561, 560, 560, 561, 564, 131, 829, 132, 116, 824, 119, 252, 557, 556, 558, 244, 559, 145, 143, 842, 142, 144, 140, 152, 150, 846, 250, 260, 489, 252, 251, 557, 824, 821, 119, 116, 117, 113, 130, 131, 127, 132, 829, 830, 824, 819, 821, 819, 825, 821, 153, 152, 846, 150, 149, 842, 231, 565, 561, 231, 230, 565, 130, 128, 129, 118, 119, 117, 134, 830, 135, 131, 130, 129, 144, 134, 135, 245, 558, 557, 245, 244, 558, 239, 238, 559, 151, 149, 150, 143, 144, 142, 563, 231, 561, 153, 151, 152, 152, 151, 150, 825, 819, 128, 148, 842, 149, 145, 144, 143, 246, 245, 557, 243, 239, 559, 820, 825, 126, 146, 133, 134, 134, 133, 830, 130, 127, 128, 132, 127, 131, 133, 132, 830, 243, 559, 244, 238, 562, 560, 242, 243, 244, 147, 148, 149, 148, 145, 842, 144, 146, 134, 123, 821, 825, 121, 120, 122, 821, 120, 119, 119, 120, 117, 295, 250, 489, 251, 249, 557, 245, 242, 244, 250, 249, 251, 126, 128, 127, 126, 825, 128, 247, 246, 557, 237, 238, 239, 242, 239, 243, 237, 562, 238, 231, 232, 230, 246, 242, 245, 250, 248, 249, 249, 248, 557, 246, 241, 242, 248, 247, 557, 234, 563, 235, 562, 563, 561, 124, 126, 132, 132, 126, 127, 240, 239, 241, 240, 237, 239, 122, 821, 123, 122, 120, 821, 120, 121, 117, 117, 121, 32, 147, 146, 148, 148, 146, 145, 145, 146, 144, 153, 147, 151, 151, 147, 149, 126, 125, 820, 241, 239, 242, 236, 563, 562, 234, 232, 563, 563, 232, 231, 230, 233, 228, 247, 241, 246, 236, 562, 237, 123, 825, 820, 124, 820, 125, 124, 123, 820, 122, 123, 121, 236, 237, 240, 146, 124, 133, 133, 124, 132, 126, 124, 125, 241, 236, 240, 235, 233, 234, 234, 233, 232, 232, 233, 230, 228, 233, 194, 236, 235, 563];

/* eslint no-new: 0 */

test('triangulates points', function (t) {
    var d = new Delaunator(points);
    t.same(Array.from(d.triangles), triangles);
    t.end();
});

test('throws on small number of points', function (t) {
    t.throws(function () {
        new Delaunator(points.slice(0, 1));
    });
    t.throws(function () {
        new Delaunator(points.slice(0, 2));
    });
    t.end();
});

test('throws on all-collinear input', function (t) {
    t.throws(function () {
        new Delaunator([[0, 0], [1, 0], [2, 0], [3, 0]]);
    });
    t.end();
});

test('supports custom point format', function (t) {
    var d = new Delaunator(
        [{x: 5, y: 5}, {x: 7, y: 5}, {x: 7, y: 6}],
        function (p) { return p.x; },
        function (p) { return p.y; });
    t.same(d.triangles, [0, 2, 1]);
    t.end();
});