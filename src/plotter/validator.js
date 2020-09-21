const getShape = (type, input) => {

    let attr, x, y, w, h, radius;
    switch (type) {
        case 'c':
            attr = input.split(' ');
            x = attr[0];
            y = attr[1];
            radius = attr[2];
            if (x && y && radius) return [x, y, radius];
            return null;
        case 'r':
            attr = input.split(' ');
            x = attr[0];
            y = attr[1];
            w = attr[2];
            h = attr[3];
            if (x && y && w && h) return [x, y, w, h];
            return null;
        case 'p':
            if (!!!input) return null;
            return [input];
        default:
            return null;
    }
}

export default { getShape };