//создаем базовый класс
class Shape {
    getSquare() {
    }

    getPerimeter() {
    }
}
//наследуемся 3 подклассами и реализуем для каждого свои методы расчета площади и периметра
class Rectangle extends Shape {
    constructor(width, length) {
        super();
        this.width = width
        this.length = length
    }

    getSquare() {
        return this.width * this.length
    }

    getPerimeter() {
        return 2 * (this.width + this.length)
    }
}


class Circle extends Shape {
    constructor(radius) {
        super()
        this.radius = radius;
        this.PI = 3.14;
    }

    getSquare() {
        return this.PI * this.radius * this.radius
    }

    getPerimeter() {
        return 2 * this.PI * this.radius
    }
}

class Triangle extends Shape {
    constructor(side1, side2, side3) {
        super();
        this.side1 = side1
        this.side2 = side2
        this.side3 = side3
    }

    getSquare() {
        return this.width * this.length / 2
    }

    getPerimeter() {
        return this.side1 + this.side2 + this.side3;
    }
}