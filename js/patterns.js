'use strict';
// Все паттерны делятся на 3 группы: структурные, пораждающие и поведенческие

//  Пораждающий паттерн Singleton
// Объект в едином экземпляре, к которому должен быть доступ из разных частей
//  программы (Корзина, карты клиента)
function singleton() {
  console.log('singleton');

  class Counter {
    constructor() {
      if (typeof Counter.instance === 'object') {
        //console.log(typeof(Counter.instance ));
        return Counter.instance;
      }
      this.count = 0;
      Counter.instance = this;
      //console.log(Counter.instance)
      return this;
    }

    getCount() {
      return this.count;
    }

    increaseCount() {
      return this.count++;
    }
  };

  const myCount1 = new Counter();
  const myCount2 = new Counter();

  myCount1.increaseCount();
  myCount1.increaseCount();
  myCount2.increaseCount();
  myCount2.increaseCount();

  console.log(myCount1.getCount());
  console.log(myCount2.getCount());

}
//singleton();


//  Фабричный метод (Factory method)
//  создание класса, который будет помогать создавать объекты на основании
//  каких-нибудь данных. Объекты с одинаковой структурой, но разными данными
function fabricMethod() {

  class BmwFactory {
    create(type) {
      if (type === 'X5') {
        return new Bmw(type, 100800, 260)
      }
      if (type === 'X6') {
        return new Bmw(type, 111000, 280)
      }
    }
  }

  class Bmw {
    constructor(model, price, maxSpeed) {
      this.model = model;
      this.price = price;
      this.maxSpeed = maxSpeed;
    }
  }

  const factory = new BmwFactory();

  const x5 = factory.create('X5');
  const x6 = factory.create('X6');

  console.log(x5);
  console.log(x6);

}
//fabricMethod();


//  Абстрактная фабрика (Abstract fabric) создает интерфейс, группирующий другие фабрики
function abstractFabric() {

  //  Abstract factory
  function bmwProducer(kind) {
    return kind === 'sport' ? sportCarFactory : familyCarFactory;
  }

  //  Factories
  function sportCarFactory() {
    return new Z4();
  }

  function familyCarFactory() {
    return new I3();
  }

  class Z4 {
    info() {
      return "Z4 is a Sport car!"
    }
  }

  class I3 {
    info() {
      return "i3 is a family car!"
    }
  }

  const produce = bmwProducer('sport');

  const myCar = new produce();

  console.log(myCar.info());

}
//abstractFabric();

//  Порождающий паттерн "Прототип" (Prototype)
//  Копирует объекты, не вдаваясь в подробности их реализации
//  Создается копия на основании уже существующей структуры
function prototypePattern() {

  class TeslaCar {
    constructor(model, price, interior, autopilot) {
      this.model = model;
      this.price = price;
      this.interior = interior;
      this.autopilot - autopilot;
    }

    produce() {
      return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
    }
  }

  const prototypeCar = new TeslaCar('S', 80000, 'black', false);

  const car1 = prototypeCar.produce();
  const car2 = prototypeCar.produce();
  const car3 = prototypeCar.produce();

  car1.interior = 'white';
  car1.autopilot = true;

  console.log(car1);
  console.log(car2);
  console.log(car3);

}
//prototypePattern();

//  Структурный паттерн Строитель (Builder)
//  Для создания объектов со сложными состояниями, также он может иметь
//  дополнительный слой абстракции - Директор(Director)
function builder() {

  class Car {
    constructor() {
      this.autopilot = false;
      this.parktronic = false;
      this.signaling = false;
    }
  }

  class CarBuilder {
    constructor() {
      this.car = new Car();
    }

    addAutoPilot(autopilot) {
      this.car.autopilot = autopilot;
      return this;
    }

    addParktronic(parktronic) {
      this.car.parktronic = parktronic;
      return this;
    }

    addSignaling(signaling) {
      this.car.signaling = signaling;
      return this;
    }

    updateEngine(engine) {
      this.car.engine = engine;
      return this;
    }

    build() {
      return this.car;
    }
  }


  const myCar = new CarBuilder()
    .addAutoPilot(true)
    .addParktronic(true)
    .updateEngine('V8')
    .build();

  console.log(myCar);

}
//builder();

//  Структурный паттерн Декоратор (Decorator)
//  Добавлять объектам новые свойства и методы, оборачивая объект в Декоратор
function decorator() {

  class Car {
    constructor() {
      this.price = 10000;
      this.model = 'Car';
    }

    getPrice() {
      return this.price;
    }

    getDescription() {
      return this.model;
    }
  }

  class Tesla extends Car {
    constructor() {
      super();
      this.price = 25000;
      this.model = 'Tesla';
    }
  }

  class Audi extends Car {
    constructor() {
      super();
      this.price = 20000;
      this.model = 'Audi';
    }
  }

  class Autopilot {
    constructor(car) {
      this.car = car;
    }

    getPrice() {
      return this.car.getPrice() + 5000;
    }

    getDescription() {
      return `for ${this.car.getDescription()} with autopilot`;
    }
  }

  class Parktronic {
    constructor(car) {
      this.car = car;
    }

    getPrice() {
      return this.car.getPrice() + 3000;
    }

    getDescription() {
      return `${this.car.getDescription()} with parktronic`;
    }
  }

  let tesla = new Tesla();
  tesla = new Autopilot(tesla);
  tesla = new Parktronic(tesla);

  console.log(tesla.getPrice(), tesla.getDescription());

  let audi = new Audi();
  audi = new Parktronic(audi);

  console.log(audi.getPrice(), audi.getDescription());

}
//decorator();

//  паттерн Фасад (Facade)
//  Собрать различные сложные структуры, объединить их и выдать простой способ
//  манипуляции.
function facade() {

  class Conveyor {
    setBody() {
      console.log('Body set');
    }

    getEngine() {
      console.log('Dismantle engine');
    }

    setEngine() {
      console.log('Engine set');
    }

    getInterior() {
      console.log('Dismantle interior');
    }

    setInterior() {
      console.log('Interior set');
    }

    setExterior() {
      console.log('Exterior set');
    }

    setWheels() {
      console.log('wheels');
    }

    addElectronics() {
      console.log('Electronics set');
    }

    paint() {
      console.log('Car painted');
    }

  }

  class ConveyorFacade {
    constructor(car) {
      this.car = car;
    }

    assemleCar() {
      this.car.setBody();
      this.car.setEngine();
      this.car.setInterior();
      this.car.setExterior();
      this.car.setWheels();
      this.car.addElectronics();
      this.car.paint();
    }

    changeEngine() {
      this.car.getEngine();
      this.car.setEngine();
    }

    changeInterior() {
      this.car.getInterior();
      this.car.setInterior();
    }
  }

  const conveyor = new ConveyorFacade(new Conveyor());
  let car = conveyor.assemleCar();
  car = conveyor.changeEngine();
  car = conveyor.changeInterior();
  console.log(car);

}
//facade();

//  Структурный паттерн Заместитель (Proxy)
//  Вместо реальных объектов предоставвляет специальные объекты-заменители
function proxy() {

  class CarAccess {
    open() {
      console.log('Opening the car door');
    }

    close() {
      console.log('Closing the car door');
    }
  }

  class SecuritySystem {
    constructor(door) {
      this.door = door;
    }

    open(password) {
      if (this.authentificate(password)) {
        this.door.open();
      } else {
        console.log('Access denied');
      }
    }

    authentificate(password) {
      return password === 'Ilon';
    }

    close() {
      this.door.close();
    }

  }

  const door = new SecuritySystem(new CarAccess());

  door.open('Jack');
  door.open('Ilon');
  door.close();

}
//proxy();


//  Структурный паттерн Адаптер (Adapter)
//  Обрачивает не совместимый с чем-то объект и делает его совместимым
function adapter() {

  class Engine2 {
    simpleInterface() {
      console.log('Engine 2.0')
    }
  }

  class EngineV8 {
    complecatedInterface() {
      console.log('Engine V8!')
    }
  }

  class EngineV8Adapter {
    constructor(engine) {
      this.engine = engine;
    }

    simpleInterface() {
      this.engine.complecatedInterface();
    }
  }

  class Car {
    startEngine(engine) {
      engine.simpleInterface();
    }
  }

  const myCar = new Car();
  const oldEngine = new Engine2();
  myCar.startEngine(oldEngine);
  console.log(myCar);

  const myCar1 = new Car();
  const EngineAdapter = new EngineV8Adapter(new EngineV8);
  myCar1.startEngine(EngineAdapter);
  console.log(myCar1);

}
//adapter();


//  Структурный паттерн Компоновщик (Composite)
//  Позволяет скомпоновать множество объектов в древовидную структуру и работать
//  с этой структурой так, как будто это 1 единственный объект
function composite() {

  class Equipment {
    getPrice() {
      return this.price || 0;
    }

    getName() {
      return this.name;
    }

    setPrice(price) {
      this.price = price;
    }

    setName(name) {
      this.name = name;
    }
  }

  class Engine extends Equipment {
    constructor() {
      super();
      this.setName('Engine');
      this.setPrice(800);
    }
  }

  class Body extends Equipment {
    constructor() {
      super();
      this.setName('Body');
      this.setPrice(3000);
    }
  }

  class Tools extends Equipment {
    constructor() {
      super();
      this.setName('Tools');
      this.setPrice(4000);
    }
  }

  class Composite extends Equipment {
    constructor() {
      super();
      this.equipments = [];
    }

    add(equipment) {
      this.equipments.push(equipment);
    }

    getPrice() {
      return this.equipments
        .map(equipment => equipment.getPrice())
        .reduce((a, b) => a + b);
    }
  }

  class Car extends Composite {
    constructor() {
      super();
      this.setName('Audi');
    }
  }

  const myCar = new Car();

  myCar.add(new Engine());
  myCar.add(new Body());
  myCar.add(new Tools());

  console.log(`${myCar.getName()} price is ${myCar.getPrice()}$`);
}
//composite();


//  Порождающий паттерн Мост (Bridge)
//  Разделяет 1 или несколько классов на несколько отдельных иерархий - абстракция
//  и реализация, что позволяет изменять их без зависимости друг от друга
//  Абстракция - специальная обертка, которая сама не выполняет рбаоту, а делегирует
//  ее выполнение одному из объектов реализаций
//  Реализация - объект конкретной реализации (сама реализация)

function bridge() {

  class Model {
    constructor(color) {
      this.color = color;
    }
  }

  class Color {
    constructor(type) {
      this.type = type;
    }
    get() {
      return this.type;
    }
  }

  class BlackColor extends Color {
    constructor() {
      super('dark black');
    }
  }

  class SiblingColor extends Color {
    constructor() {
      super('Silbermetallic');
    }
  }

  class Audi extends Model {
    constructor(color) {
      super(color);
    }

    paint() {
      return `Car: Audi, Color: ${this.color.get()}`;
    }
  }

  class Bmw extends Model {
    constructor(color) {
      super(color);
    }

    paint() {
      return `Car: BMW, Color: ${this.color.get()}`;
    }
  }

  const blackBMW = new Bmw(new BlackColor());
  console.log(blackBMW.paint());

}
//bridge();


//  Структурный паттерн Легковес, кэш (Flyweight)
//  Позволяет вместить большее кол-во определенных объектов в выделенную ОЗУ,
//  позволяет экономить ресурсы, разделяя общее состояние объектов между собой
//  вместо хранения одинаковых данных в разных объектов
//  Все свое внутреннее состояние он должен получить через параметры конструктора
//  и у него не должно быть никаких публичных полей и сеттеров.
//  Создавть легковесы нужно с помощью фабрик.
function flyweight() {

  class Car {
    constructor(model) {
      this.model = model;
    }
  }

  class CarFactory {
    constructor(name) {
      this.models = {};
    }

    create(name) {
      let model = this.models[name];
      if (model) {
        return model;
      }
      console.log('model');
      this.models[name] = new Car(name);
      return this.models[name];
    }

    getModels() {
      console.table(this.models);
    }
  }

  const factory = new CarFactory();
  const bmw = factory.create('BMW');
  const audi = factory.create('Audi');
  const peugeot = factory.create('Peugeot');
  const orangePeugeot = factory.create('Peugeot');

  console.log(factory.getModels());

}
//flyweight();

//  Поведенческий паттерн Посредник (Mediator)
//  Позволяет уменьшить взаимосвязь классов между собой, вынося межклассовые
//  связи в класс-посредник
function mediator() {

  class OfficialDealer {
    constructor() {
      this.customers = [];
    }

    orderCar(customer, car, info) {
      const name = customer.getName();

      console.log(`Order name: ${name}. Order car is ${car}`);
      console.log(`Additional info: ${info}`);
      this.addToCustomersList(name);
    }

    addToCustomersList(name) {
      this.customers.push(name);
    }

    getCustomersList() {
      return this.customers;
    }
  }

  class Customer {
    constructor(name, dealerMediator) {
      this.name = name;
      this.dealerMediator = dealerMediator;
    }

    getName() {
      return this.name;
    }

    makeOrder(car, info) {
      this.dealerMediator.orderCar(this, car, info);
    }
  }

  const mediator = new OfficialDealer();
  const alex = new Customer('Alex', mediator);
  const valera = new Customer('Valera', mediator);

  alex.makeOrder('BMW', 'With turbo');
  valera.makeOrder('Peugeot', 'With wheels');

  console.log(mediator.getCustomersList());

}
//mediator();

//  Поведенческий паттерн Итератор (Iterator)
//  Последовательно обходит элементы составных объектов, не раскрывая их внутреннее
//  представление
function iterator() {

  class Iterator {
    constructor(el) {
      this.index = 0;
      this.keys = Object.keys(el);
      this.elements = el;
    }

    next() {
      return this.elements[this.keys[this.index++]];
    }

    hasNext() {
      return this.index < this.keys.length;
    }
  }

  //const collection = new Iterator(['Audi', 'Peugeot', 'BMW', 'Toyota']);
  let cars = {
    audi: { model: 'Audi', color: 'black', price: 20000 },
    bmw: { model: 'BMW', color: 'black', price: 29000 },
    peugeot: { model: 'Peugeot', color: 'white', price: 14000 },
  }
  const collection = new Iterator(cars);

  while (collection.hasNext()) {
    console.log(collection.next());
  }

}
//iterator();

//  Поведенческий паттерн Цепочка обязанностей (Chain of responsibilities)
//  Позволяет передавать запросы последовательно по цепочке обработчиков,
//  причем каждый последующий обработчик решает задачу, может ли он сам обработать
//  запрос, либо его следует передать дальше по цепочке
function chainOfResponsibility() {

  class Account {
    pay(orderPrice) {
      if (this.canPay(orderPrice)) {
        console.log(`Paid ${orderPrice} using ${this.name}`);
      } else if (this.incomer) {
        console.log(`Cannot pay using ${this.name}`);
        this.incomer.pay(orderPrice);
      } else {
        console.log('Unfortunately, not enough money');
      }
    }

    canPay(amount) {
      return this.balance >= amount;
    }

    setNext(account) {
      this.incomer = account;
    }

    show() {
      console.log(this);
    }
  }

  class Master extends Account {
    constructor(balance) {
      super();
      this.name = 'Master Card';
      this.balance = balance;
    }
  }

  class Paypal extends Account {
    constructor(balance) {
      super();
      this.name = 'Paypal';
      this.balance = balance;
    }
  }

  class Qiwi extends Account {
    constructor(balance) {
      super();
      this.name = 'Qiwi';
      this.balance = balance;
    }
  }

  const master = new Master(100);
  const paypal = new Paypal(300);
  const qiwi = new Qiwi(500);

  // Define chain
  master.setNext(paypal);
  paypal.setNext(qiwi);

  // Start payment
  master.pay(438);
  master.show();

}
//chainOfResponsibility();

//  Поведенческий паттерн Стратегия (Strategy)
//  Определяет схожие алгоритмы и помещает их в свой отдельный класс
//  Выделяет семейство схожих алгоритмов и помещает их в отдельный класс
//  Эти классы и называются стратегиями и они должны иметь одинаквый интефейс взаимодействия
function strategy() {

  function baseStrategy(amount) {
    return amount;
  }

  function premiumStrategy(amount) {
    return amount * 0.85;
  }

  function platinumStrategy(amount) {
    return amount * 0.65;
  }

  class CarCart {
    constructor(discount) {
      this.discount = discount;
      this.amount = 0;
    }

    checkout() {
      return this.discount(this.amount);
    }

    setAmount(amount) {
      this.amount = amount;
    }
  }

  const baseCustomer = new CarCart(baseStrategy);
  const premiumCustomer = new CarCart(premiumStrategy);
  const platinumCustomer = new CarCart(platinumStrategy);

  baseCustomer.setAmount(50000);
  console.log(baseCustomer.checkout());

  premiumCustomer.setAmount(50000);
  console.log(premiumCustomer.checkout());

  platinumCustomer.setAmount(50000);
  console.log(platinumCustomer.checkout());

}
//strategy();

//  Поведенческий паттерн Снимок (Memento)
//  Сохраняет и восстанавливает предыдущее состояние объекта
function memento() {

  class Memento {
    constructor(value) {
      this.value = value;
    }
  }

  const creator = {
    save: val => new Memento(val),
    restore: memento => memento.value
  }

  class Caretaker {
    constructor() {
      this.values = [];
    }

    addMemento(memento) {
      this.values.push(memento);
    }

    getMemento(index) {
      return this.values[index];
    }
  }

  const careTaker = new Caretaker();
  careTaker.addMemento(creator.save("hello"));
  careTaker.addMemento(creator.save("hello world"));
  careTaker.addMemento(creator.save("hello world!!!"));

  console.log(creator.restore(careTaker.getMemento(2)));
}
//memento();

//  Поведенческий паттерн Шаблон (Template)
//  Определяет базовые шаги выполнения алгоритма
//  и выполнение каждого из этих шагов делегирует на соответствующие методы или подклассы
function template() {

  class Builder {
    build() {
      this.addEngine();
      this.installChassis();
      this.addElectronics();
      this.collectAccessories();
    }
  }

  class TeslaBuilder extends Builder {
    addEngine() {
      console.log('Add Tesla engine');
    };

    installChassis() {
      console.log('Install Tesla chassis');
    };

    addElectronics() {
      console.log('Add Tesla electronics');
    };

    collectAccessories() {
      console.log('Collect Tesla accessories');
    }
  }

  class BmwBuilder extends Builder {
    addEngine() {
      console.log('Add BMW engine');
    };

    installChassis() {
      console.log('Install BMW chassis');
    };

    addElectronics() {
      console.log('Add BMW electronics');
    };

    collectAccessories() {
      console.log('Collect BMW accessories');
    }
  }

  const teslaBuilder = new TeslaBuilder();
  const bmwBuilder = new BmwBuilder();

  teslaBuilder.build();
  bmwBuilder.build();

}
//template();

//  паттерн Посетитель(Visitor)
//  Добавляет новую функциональность уже существующим классам, не изменяя исходный
//  код класса
function visitor() {

  class Car {
    accept(visitor) {
      visitor(this);
    }
  }

  class Tesla extends Car {
    info() {
      return 'It is a Tesla car';
    }

  }

  class Bmw extends Car {
    info() {
      return 'It is a BMW car';
    }

  }

  class Audi extends Car {
    info() {
      return 'It is a Audi car';
    }

  }

  function exportVisitor(car) {
    if (car instanceof Tesla) {
      car.export = console.log(`Exported data: ${car.info()}`);
    }
    if (car instanceof Bmw) {
      car.export = console.log(`Exported data: ${car.info()}`);
    }
    if (car instanceof Audi) {
      car.export = console.log(`Exported data: ${car.info()}`);
    }
  }

  const tesla = new Tesla();
  const bmw = new Bmw();

  console.log(tesla.accept(exportVisitor));
  console.log(bmw.accept(exportVisitor));

}
//visitor();

//  Поведенческий паттерн Команда (Command)
//  Помогает инкапсулировать некоторые действия и необходимые для них данные,
//  отделяя клиента от получателя
function command() {

  class Driver {
    constructor(command) {
      this.command = command;
    }

    execute() {
      this.command.execute();
    }
  }

  class Engine {
    constructor() {
      this.state = false;
    }

    on() {
      this.state = true;
    }

    off() {
      this.state = false;
    }
  }

  class OnStartCommand {
    constructor(engine) {
      this.engine = engine;
    }

    execute() {
      this.engine.on();
    }
  }

  class onSwitchOffCommand {
    constructor(engine) {
      this.engine = engine;
    }

    execute() {
      this.engine.off();
    }
  }

  const engine = new Engine();
  console.log(engine);

  const onStartCommand = new OnStartCommand(engine);
  const driver = new Driver(onStartCommand);
  driver.execute();

  console.log(engine);

}
//command();

//  Поведенческий паттерн Наблюдатель (Observer)
//  Создает механизм подписки, позволяющий следить одним объектам за изменениями других
function observer() {

  class CarNews {
    constructor() {
      this.news = '';
      this.actions = [];
    }

    setNews(text) {
      this.news = text;
      this.notifyAll();
    }

    notifyAll() {
      return this.actions.forEach(subs => subs.inform(this));
    }

    register(observer) {
      this.actions.push(observer);
    }

    unregister(observer) {
      this.actions = this.actions.filter(el => !(el instanceof observer));
    }

  }

  class Jack {
    inform(message) {
      console.log(`Jack has been informed about: ${message.news}`);
    }
  }

  class Alex {
    inform(message) {
      console.log(`Alex has been informed about: ${message.news}`);
    }
  }

  const carNews = new CarNews();

  carNews.register(new Jack());
  carNews.register(new Alex());

  carNews.setNews('All people is shit!');

}
//observer();

//  Поведенческий паттерн Состояние (State)
//  Позволяет менять объектам свое поведение в зависимости от состояния
//  Программа может находится в разных состояниях и поэтому реагировать на
//  1 и то же событие по разному

function state() {

  class OrderStatus {
    constructor(name, nextStatus) {
      this.name = name;
      this.nextStatus = nextStatus;
    }

    next() {
      return new this.nextStatus();
    }
  }

  class WaitingForPayment extends OrderStatus {
    constructor() {
      super('WaitingForPayment', Shipping);
    }
  }

  class Shipping extends OrderStatus {
    constructor() {
      super('Shipping', Delivered);
    }
  }

  class Delivered extends OrderStatus {
    constructor() {
      super('Delivered', Delivered);
    }
  }

  class Order {
    constructor() {
      this.state = new WaitingForPayment();
    }

    nextState() {
      this.state = this.state.next();
    }

    cancelOrder() {
      this.state.name === 'WaitingForPayment' ? console.log('Order is canceled') :
        console.log('Order can not be canceled!');
    }
  }

  const myOrder = new Order();
  console.log(myOrder.state.name);

  myOrder.nextState();
  console.log(myOrder.state.name);

  myOrder.nextState();
  console.log(myOrder.state.name);

}
state();
