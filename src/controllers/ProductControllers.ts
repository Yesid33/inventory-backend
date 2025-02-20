import "reflect-metadata";
import {
  BadRequestError,
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { MESSAGE_ERROR } from "../constants/message-error.const";
import { ProductDTO } from "../models/dto/Product";
import { ProductInterface } from "../models/interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [];

  @Get("")
  getAll() {
    return {
      data: [...this.products],
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate: true }) productItem: ProductDTO) {
    const index = this.findIndex(productItem.id);

    if (index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }

    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if (index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }
}
