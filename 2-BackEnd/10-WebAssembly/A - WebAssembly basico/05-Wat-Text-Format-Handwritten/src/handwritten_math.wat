(module
  (func $add_i32 (export "add_i32") (param $left i32) (param $right i32) (result i32)
    local.get $left
    local.get $right
    i32.add
  )

  (func $mul_i32 (export "mul_i32") (param $left i32) (param $right i32) (result i32)
    local.get $left
    local.get $right
    i32.mul
  )

  (func $triangular (export "triangular") (param $n i32) (result i32)
    (local $acc i32)
    (local $counter i32)
    local.get $n
    local.set $counter
    i32.const 0
    local.set $acc
    block $exit
      loop $accumulate
        local.get $counter
        i32.eqz
        br_if $exit
        local.get $acc
        local.get $counter
        i32.add
        local.set $acc
        local.get $counter
        i32.const 1
        i32.sub
        local.set $counter
        br $accumulate
      end
    end
    local.get $acc
  )

  (func $abs_diff (export "abs_diff") (param $left i32) (param $right i32) (result i32)
    (local $diff i32)
    local.get $left
    local.get $right
    i32.sub
    local.tee $diff
    i32.const 0
    i32.lt_s
    if (result i32)
      i32.const 0
      local.get $diff
      i32.sub
    else
      local.get $diff
    end
  )
)
