irb(main):002:0> puts "Hello World"
Hello World
=> nil

irb(main):007:0> a = 3 ** 2
=> 9
irb(main):008:0> b = 4 ** 2
=> 16
irb(main):009:0> Math.sqrt(a+b)
=> 5.0

irb(main):010:0> def hi
irb(main):011:1> puts "Hello World!"
irb(main):012:1> end
=> :hi

irb(main):019:0> def hi(name = "World")
irb(main):020:1> puts "Hello #{name.capitalize}!"
irb(main):021:1> end
=> :hi
irb(main):022:0> hi "chris"
Hello Chris!
=> nil
irb(main):023:0> hi
Hello World!
=> nil

def multiplica(a, b)
    return a * b  # O valor é retornado automaticamente
end

resultado = multiplica(4, 2)
puts "O Resultado é " + resultado.to_s  
=> O Resultado é 8
