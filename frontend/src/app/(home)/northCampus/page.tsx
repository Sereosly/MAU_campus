import { NorthCampusMap } from "../_canvas/northCampus";

export default function NorthCampus() {
    const svgs = [
        { path: '/home/icons/E15.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/E16.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/K9.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/L57.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/Home.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/WalkRoad.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
        { path: '/home/icons/CrossRoad.svg', width: 2000, height: 2000, offsetX: 0, offsetY: 0 },
    ];

    const realBounds = {
        lat_min: 68.965612,
        lng_min: 33.068397,
        lat_max: 68.962235,
        lng_max: 33.080285,
    };

    return (
        <div className="flex-1 h-screen">
            <NorthCampusMap
                svgs={svgs}
                realBounds={realBounds}
            />
        </div>
    );
}

