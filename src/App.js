import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [specButtons, setSpecButtons] = useState([
    { id: 100, type: 'colspan', value: 10 },
  ])

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const [till, setTill] = useState(0)
  const [modifier, setModifier] = useState(null)
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)

  const buttons = [
    { id: 0, name: '0', type: 'quantity' },
    { id: 1, name: '1', type: 'quantity' },
    { id: 2, name: '2', type: 'quantity' },
    { id: 3, name: '3', type: 'quantity' },
    { id: 4, name: '4', type: 'quantity' },
    { id: 5, name: '5', type: 'quantity' },
    { id: 6, name: '6', type: 'quantity' },
    { id: 7, name: '7', type: 'quantity' },
    { id: 8, name: '8', type: 'quantity' },
    { id: 9, name: '9', type: 'quantity' },
    // line
    { id: 11 - 1, name: 'XS', type: 'modifier' },
    { id: 12 - 1, name: 'Big Mac', type: 'meal', value: "1", full_name: "(1) Big Mac", price: 4.99 },
    { id: 13 - 1, name: 'QPC', type: 'meal', value: "2a", full_name: "(2a) Quarter Pounder with Cheese", price: 5.59 },
    { id: 14 - 1, name: 'Bacon QPC', type: 'meal', value: "2b", full_name: "(2b) Bacon Quarter Pounder with Cheese", price: 7.19 },
    { id: 15 - 1, name: 'QP Dlx', type: 'meal', value: "2c", full_name: "(2c) Quarter Pounder with Cheese Deluxe", price: 6.39 },
    { id: 16 - 1, name: 'Dbl QPC', type: 'meal', value: "3", full_name: "(3) Double Quarter Pounder with Cheese", price: 7.89 },
    { id: 17 - 1, name: 'Crispy Ckn', type: 'meal', value: "4a", full_name: "(4a) Crispy Chicken Sandwich", price: 5.39 },
    { id: 18 - 1, name: 'Spicy Crispy', type: 'meal', value: "4b", full_name: "(4b) Spicy Crispy Chicken Sandwich", price: 5.89 },
    { id: 19 - 1, name: '', type: 'colspan', value: 1 },
    { id: 20 - 1, name: 'Promo Item', type: 'function', func: () => {
        var selItemOrLast = order.find((item) => item.id === selectedItem) || order[order.length - 1] || null;
        setOrder(order.map((item) => {
          if (item.id === selItemOrLast.id && !selItemOrLast.modifier?.find((mod) => mod.name === 'Promo')) {
            return { ...item, modifier: [
              ...item.modifier,
              { id: rollingId, name: 'Promo', type: 'modifier', full_name: "Promo Item", price: -(selItemOrLast.price + item.modifier.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)), 0)) }
            ] }
          }
          return item
        }))
        setRollingId(rollingId + 1)
    }},
    // line
    { id: 21 - 1, name: 'S', type: 'modifier' },
    { id: 22 - 1, name: 'Dlx Cspy', type: 'meal', value: "4c", full_name: "(4c) Deluxe Crispy Chicken Sandwich", price: 6.89 },
    { id: 23 - 1, name: 'Dlx Cspy (SPCY)', type: 'meal', value: "4d", full_name: "(4d) Deluxe Crispy Chicken Sandwich (Spicy)", price: 7.39 },
    { id: 24 - 1, name: '10 Nug', type: 'meal', value: "5", full_name: "(5) 10 Piece Chicken McNuggets", price: 5.39 },
    { id: 25 - 1, name: 'Filet-O-Fish', type: 'meal', value: "6", full_name: "(6) Filet-O-Fish", price: 5.19 },
    { id: 26 - 1, name: 'Chs Bgr', type: 'meal', value: "7", full_name: "(7) Cheeseburger", price: 3.19 },
    { id: 27 - 1, name: '', type: 'colspan', value: 1 },
    { id: 28 - 1, name: 'Dbl Cheese', type: 'meal', value: "", full_name: "Double Cheeseburger", price: 3.59 },
    { id: 29 - 1, name: '', type: 'colspan', value: 1 },
    {
      id: 30 - 1, name: 'FG/BG Swap', type: 'function', func: () => {
        setOrderSave(order)
        setOrder(orderSave)
      }
    },
    // line
    { id: 31 - 1, name: 'M', type: 'modifier' },
    { id: 32 - 1, name: '', type: 'colspan', value: 1 },
    { id: 33 - 1, name: 'Triple Chs', type: 'meal', value: "", full_name: "Triple Cheeseburger", price: 5.19 },
    { id: 34 - 1, name: '', type: 'colspan', value: 2 },
    { id: 35 - 1, name: 'Mc Chicken', type: 'meal', value: "", full_name: "McChicken", price: 2.99 },
    { id: 36 - 1, name: '', type: 'colspan', value: 3 },
    {
      id: 36, name: 'Clear Order', type: 'function', func: () => {
        setOrder([])
        setSelectedItem(null)
        setFinalMsg(null)
        setSpecButtons([{ name: '', type: 'colspan', value: 10 }])
      }
    },
    // line
    { id: 37, name: 'L', type: 'modifier' },
    { id: 38, name: '', type: 'colspan', value: 4 },
    { id: 39, name: 'McRib', type: 'meal', value: "", full_name: "McRib", price: 5.39 },
    { id: 40, name: 'Fountain Soda', type: 'soda', value: "", full_name: "Fountain Soda", price: [0.49, 0.69, 0.99, 1.29] },
    { id: 40 + 1, name: 'Fries', type: 'fries', value: "", full_name: "Fries", price: [2.49, 3.19, 4.19, 5.19] },
    { id: 41 + 1, name: '', type: 'colspan', value: 1 },
    {
      id: 42 + 1, name: 'Void Line', type: 'function', func: () => handleClick({
        name: '0', type: 'quantity'
      })
    },
    // line
    { id: 43 + 1, name: '', type: 'colspan', value: 1 },
    { id: 44 + 1, name: 'Coke', type: 'drink' },
    { id: 45 + 1, name: 'Diet Coke', type: 'drink' },
    { id: 46 + 1, name: 'Sprite', type: 'drink' },
    { id: 47 + 1, name: 'Fanta Orange', type: 'drink' },
    { id: 48 + 1, name: 'Iced Tea', type: 'drink' },
    { id: 49 + 1, name: 'Sweet Tea', type: 'drink' },
    { id: 50 + 1, name: 'Coffee', type: 'drink' },
    {
      id: 51 + 1, name: 'Takeout Total', type: 'function', value: 1, func: () => {
        if (order.find((item) => item.errors.length > 0)) {
          alert("Please resolve errors before printing")
          return
        }
        var total = order.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)) + item.modifier.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)), 0), 0)
        setSpecButtons([
          { id: 0, name: 'Cash', type: 'spec', func: handlePayment },
          { id: 1, name: 'Credit Card (AP/GP)', type: 'spec', func: handlePayment },
          { id: 2, name: 'My McD (inc QR)', type: 'spec', func: handlePayment },
          { id: 3, name: 'QR Code (LP/TWP)', type: 'spec', func: handlePayment },
          { id: 4, name: '', type: 'colspan', value: 4 },
          { id: 5, name: 'REIM BURSE', type: 'function', func: handlePayment },
          { id: 6, name: 'Empl Void', type: 'function', func: handlePayment },
        ])
        setFinalMsg("-------------\nTAKEOUT\nTotal: $" + total.toFixed(2) + "\n-------------")
      }
    },
    { id: 52 + 1, name: 'Eat In Total', type: 'function', value: 1, func: () => {
      if (order.find((item) => item.errors.length > 0)) {
        alert("Please resolve errors before printing")
        return
      }
      var total = order.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)) + item.modifier.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)), 0), 0)
      setSpecButtons([
        { id: 0, name: 'Cash', type: 'spec', func: handlePayment },
        { id: 1, name: 'Credit Card (AP/GP)', type: 'spec', func: handlePayment },
        { id: 2, name: 'My McD (inc QR)', type: 'spec', func: handlePayment },
        { id: 3, name: 'QR Code (LP/TWP)', type: 'spec', func: handlePayment },
        { id: 4, name: '', type: 'colspan', value: 4 },
        { id: 5, name: 'REIM BURSE', type: 'function', func: handlePayment },
        { id: 6, name: 'Empl Void', type: 'function', func: handlePayment },
      ])
      setFinalMsg("-------------\nEAT IN\nTotal: $" + total.toFixed(2) + "\n-------------")
    } },
  ]

  function handlePayment() {
    setLoading(true)
    setTimeout(() => {
      setTill(till + parseFloat(order.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)) + item.modifier.reduce((acc, item) => acc + (item.price === '' ? 0 : parseFloat(item.price)), 0), 0).toFixed(2)))
      setOrder([])
      setSelectedItem(null)
      setFinalMsg(null)
      setSpecButtons([{ name: '', type: 'colspan', value: 10 }])
      setOrderNumber(orderNumber + 1)
      setLoading(false)
    }, Math.random() * 4000 + 1000)
  }

  const [rollingId, setRollingId] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [orderNumber, setOrderNumber] = useState(0)

  const [orderSave, setOrderSave] = useState([])

  const [finalMsg, setFinalMsg] = useState(null)

  const setMealPrice = [2.00, 3.00, 4.00, 5.00];

  function handleClick(button) {
    if (finalMsg !== null) {
      setFinalMsg(null)
      setSpecButtons([{ name: '', type: 'colspan', value: 10 }])
    }
    if (button.type === 'meal') {
      setOrder([...order, {
        id: rollingId,
        name: button.full_name,
        type: 'meal',
        price: button.price,
        modifier: [],
        errors: [],
      }])
      setRollingId(rollingId + 1)
    } else if (button.type === 'modifier') {
      setModifier(button.name)
      var selItem = order.find((item) => item.id === selectedItem) || null;
      if (selItem !== null && (selItem.name === 'Fountain Soda' || selItem.name === 'Fries')) {
        setOrder(order.map((item) => {
          if (item.id === selItem.id) {
            return {
              ...item,
              modifier: [
                ...item.modifier.filter((mod) => !Array.from(['XS', 'S', 'M', 'L']).includes(mod.name)),
                {
                  name: button.name,
                  price: buttons[item.pid].price[Array.from(['XS', 'S', 'M', 'L']).indexOf(button.name)],
                }
              ],
              errors: item.errors.filter((error) => error.type !== "SEL_MOD")
            }
          }
          return item
        }))
        setModifier(null)
      } else if (selItem === null) {
        selItem = order[order.length - 1]
        if (selItem?.errors?.find((error) => error.type === "SEL_MOD")) {
          setOrder(order.map((item) => {
            if (item.id === selItem.id) {
              return {
                ...item,
                modifier: [
                  ...item.modifier.filter((mod) => !Array.from(['XS', 'S', 'M', 'L']).includes(mod.name)),
                  {
                    name: button.name,
                    price: buttons[item.pid].price[Array.from(['XS', 'S', 'M', 'L']).indexOf(button.name)],
                  }
                ],
                errors: item.errors.filter((error) => error.type !== "SEL_MOD")
              }
            }
            return item
          }))
          setModifier(null)
        }
      }

      var selItem = order.find((item) => item.id === selectedItem) || null;
      if (selItem !== null && (selItem.type === "meal")) {
        // TODO: set meal
        if (selItem.modifier.find((mod) => mod.name.split(' ')[0] === button.name)) {
          setOrder(order.map((item) => {
            if (item.id === selItem.id) {
              return {
                ...item,
                modifier: item.modifier.filter((mod) => mod.name.split(' ')[0] !== button.name),
              }
            }
            return item
          }))
        } else {
          setOrder(order.map((item) => {
            if (item.id === selItem.id) {
              return {
                ...item,
                modifier: [...item.modifier, {
                  name: button.name + " Meal",
                  price: setMealPrice[Array.from(['XS', 'S', 'M', 'L']).indexOf(button.name)],
                }],
                errors: item.errors.filter((error) => error.type !== "SEL_MOD")
              }
            }
            return item
          }))
        }
        // TODO: END TODO //
      }

    } else if (button.type === 'quantity') {
      var cnt = 0;
      if (parseInt(button.name) === 0) {
        if (selectedItem) {
          setOrder(order.filter((item) => {
            return item.id !== selectedItem
          }))
          setSelectedItem(null)
        } else {
          setOrder(order.slice(0, order.length - 1))
        }
        return
      }
      setOrder([...order, ...Array(parseInt(button.name) - 1).fill(order.find((item) => {
        return item.id === selectedItem
      }) || order[order.length - 1]).map((item) => {
        cnt++
        return {
          ...item,
          id: rollingId + cnt,
        }
      })])
      setRollingId(rollingId + button.name)
    } else if (button.type === 'fries' || button.type === 'soda') {
      if (modifier) {
        setOrder([...order, {
          pid: button.id,
          id: rollingId,
          name: button.full_name,
          type: button.type,
          price: "",
          modifier: [
            {
              name: modifier,
              price: button.price[Array.from(['XS', 'S', 'M', 'L']).indexOf(modifier)],
            }
          ],
          errors: [
            button.type === 'soda' && { name: 'Please select a soda', type: 'SEL_SODA' }
          ]
        }])
        setModifier(null)
      } else {
        setOrder([...order, {
          pid: button.id,
          id: rollingId,
          name: button.full_name,
          type: button.type,
          price: "",
          modifier: [],
          errors: [
            { name: 'Please select a size', type: 'SEL_MOD' },
            button.type === 'soda' && { name: 'Please select a soda', type: 'SEL_SODA' }
          ]
        }])
      }
      setRollingId(rollingId + 1)
    } else if (button.type === 'drink') {
      selItem = order.find((item) => item.id === selectedItem) || null;
      if (selItem !== null && selItem.name === 'Fountain Soda') {
        setOrder(order.map((item) => {
          if (item.id === selItem.id) {
            return {
              ...item,
              modifier: [
                ...item.modifier.filter((mod) => !Array.from(buttons.slice(44, 51).map((b) => b.name)).includes(mod.name)),
                {
                  name: button.name,
                  price: '',
                }
              ],
              errors: item.errors.filter((error) => error.type !== "SEL_SODA")
            }
          }
          return item
        }))
        setModifier(null)
      } else if (selItem === null) {
        selItem = order[order.length - 1]
        if (selItem?.errors?.find((error) => error.type === "SEL_SODA")) {
          setOrder(order.map((item) => {
            if (item.id === selItem.id) {
              return {
                ...item,
                modifier: [
                  ...item.modifier.filter((mod) => !Array.from(buttons.slice(44, 51).map((b) => b.name)).includes(mod.name)),
                  {
                    name: button.name,
                    price: '',
                  }
                ],
                errors: item.errors.filter((error) => error.type !== "SEL_SODA")
              }
            }
            return item
          }))
          setModifier(null)
        } else {
          setOrder([...order, {
            pid: 40,
            id: rollingId,
            name: "Fountain Soda",
            type: "soda",
            price: "",
            modifier: [
              {
                name: button.name,
                price: '',
              },
              !modifier || {
                name: modifier,
                price: buttons[40].price[Array.from(['XS', 'S', 'M', 'L']).indexOf(modifier)],
              }
            ],
            errors: [
              !modifier && { name: 'Please select a size', type: 'SEL_MOD' },
            ]
          }])
          setRollingId(rollingId + 1)
          setModifier(null)
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex h-full">
          <div className="w-1/5 h-screen bg-zinc-300 overflow-auto" onClick={
            () => setSelectedItem(null)
          }>
            <div className="w-full border-0 border-b-2 text-black font-mono text-sm p-4 text-center">
              McDonald's TW<br></br>EMPLOYEE: Aaron<br></br>Order {orderNumber + 1000}<br></br>{time.toLocaleString()}
            </div>
            {
              order.map((item) => (
                <div className="w-full border-0 border-b-2 text-black font-mono text-sm p-1" key={item.id} onClick={
                  (e) => {
                    e.stopPropagation()
                    setSelectedItem(item.id)
                  }
                } style={
                  selectedItem === item.id ? { backgroundColor: '#000', color: '#fff' } : {}
                }>
                  <div className='flex justify-between'>
                    <div>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span>{parseFloat(item.price).toFixed(2) === "NaN" ? "" : parseFloat(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                  {
                    item.modifier.filter((mod) => mod !== true).map((mod) => (
                      <div className='flex justify-between' key={item.modifier.indexOf(mod)}>
                        <div>
                          <span>|- {mod.name}</span>
                        </div>
                        <div>
                          <span>{parseFloat(mod.price).toFixed(2) === "NaN" ? "" : parseFloat(mod.price).toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  }
                  <div className='bg-black text-red-400'>
                    {
                      item.errors && item.errors.map((error) => (
                        <p key={item.errors.indexOf((err) => err === error)}>{error.name}</p>
                      ))
                    }
                  </div>
                </div>
              )
              )
            }
            {
              finalMsg && <div className="w-full border-0 border-b-2 text-black font-mono text-sm p-4 text-center">
                {finalMsg.split("\n").map(function (item) {
                  return (
                    <span>
                      {item}
                      <br />
                    </span>
                  )
                })}
              </div>
            }
          </div>
          <div className="w-4/5 h-screen bg-metal">
            {
              loading ? <div role="status" className='w-full h-[100vh] flex items-center justify-center flex-col gap-5'>
                <span>Processing Payment</span>
                <svg aria-hidden="true" class="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div> : <>
                <div className="w-full bg-black text-white text-[1.3vw] p-1">
                  <div className="grid grid-cols-5">
                    <div>
                      <span>Employee: Aaron</span>
                    </div>
                    <div>
                      <span>{modifier}</span>
                    </div>
                    <div>
                      <span>Till: ${till.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>Orders: {orderNumber + 1}</span>
                    </div>
                    <div className="text-right">
                      <span>{time.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-10 auto-rows-[6.5vw] gap-4 p-5">
                  {
                    specButtons.map((button) => {
                      return (
                        <Button key={button.id} id={button.id} name={button.name} type={button.type} value={button.value} full_name={button.full_name} price={button.price} func={handleClick} a_func={button.func} />
                      )
                    })
                  }
                  {
                    buttons.map((button) => {
                      return (
                        <Button key={button.id} id={button.id} name={button.name} type={button.type} value={button.value} full_name={button.full_name} price={button.price} func={handleClick} a_func={button.func} />
                      )
                    }
                    )
                  }
                </div>
              </>
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
