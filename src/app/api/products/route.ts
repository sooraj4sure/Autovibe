// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Product from "@/models/Product";
// import { isAdminAuthenticated } from "@/lib/auth";

// // GET /api/products - Fetch all products with filters & pagination
// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "12");
//     const category = searchParams.get("category");
//     const search = searchParams.get("search");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const sortBy = searchParams.get("sortBy") || "newest";
//     const featured = searchParams.get("featured");

//     // Build query
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const query: Record<string, any> = { isActive: true };

//     if (category && category !== "all") query.category = category;
//     if (featured === "true") query.isFeatured = true;

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = parseInt(minPrice);
//       if (maxPrice) query.price.$lte = parseInt(maxPrice);
//     }

//     if (search) {
//       query.$text = { $search: search };
//     }

//     // Sort options
//     const sortOptions: Record<string, Record<string, number>> = {
//       newest: { createdAt: -1 },
//       price_asc: { price: 1 },
//       price_desc: { price: -1 },
//       featured: { isFeatured: -1, createdAt: -1 },
//     };

//     const sort = sortOptions[sortBy] || sortOptions.newest;

//     const skip = (page - 1) * limit;
//     const total = await Product.countDocuments(query);
//     const products = await Product.find(query)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     return NextResponse.json({
//       success: true,
//       data: products,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Products fetch error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/products - Create a new product (Admin only)
// export async function POST(req: NextRequest) {
//   try {
//     const admin = isAdminAuthenticated(req);
//     if (!admin) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();
//     const body = await req.json();

//     const product = new Product(body);
//     await product.save();

//     return NextResponse.json(
//       { success: true, data: product, message: "Product created successfully" },
//       { status: 201 }
//     );
//   } catch (error: unknown) {
//     console.error("Product create error:", error);
//     const message = error instanceof Error ? error.message : "Failed to create product";
//     return NextResponse.json(
//       { success: false, error: message },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { isAdminAuthenticated } from "@/lib/auth";

// GET /api/products - Fetch all products with filters & pagination
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "newest";
    const featured = searchParams.get("featured");

    // Build query
    const query: Record<string, any> = { isActive: true };

    if (category && category !== "all") query.category = category;
    if (featured === "true") query.isFeatured = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Sort options (FIXED TYPE)
    const sortOptions: Record<string, Record<string, 1 | -1>> = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      featured: { isFeatured: -1, createdAt: -1 },
    };

    const sort = sortOptions[sortBy] || sortOptions.newest;

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(req: NextRequest) {
  try {
    const admin = await isAdminAuthenticated(req); // FIXED (await added)

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const product = new Product(body);
    await product.save();

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product created successfully",
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Product create error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create product";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

