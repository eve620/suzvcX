import {NextRequest, NextResponse} from "next/server";
import path from "path";
import * as fs from "fs";

export async function GET(request: NextRequest) {
    const folderPath = path.join(process.cwd(), 'app', 'scripts', 'courses');
    try {
        const jsonFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.json')).map(file => path.parse(file).name);

        return NextResponse.json(jsonFiles);
    } catch (error) {
        // 如果发生错误，返回404
        return NextResponse.json({message: '数据不存在'}, {status: 404});
    }

}
