const COINS = [
  { name: "Bitcoin",  symbol: "BTC",  price: "$77,960.00", change: "+4.1%",  up: true  },
  { name: "Ethereum", symbol: "ETH",  price: "$2,448.97",  change: "+4.4%",  up: true  },
  { name: "Tether",   symbol: "USDT", price: "$1.00",       change: "+0.0%",  up: true  },
  { name: "BNB",      symbol: "BNB",  price: "$644.32",    change: "+2.8%",  up: true  },
  { name: "Solana",   symbol: "SOL",  price: "$90.15",     change: "+3.8%",  up: true  },
  { name: "XRP",      symbol: "XRP",  price: "$0.612",     change: "+1.2%",  up: true  },
  { name: "USDC",     symbol: "USDC", price: "$1.00",       change: "+0.0%",  up: true  },
];

const items = [...COINS, ...COINS]; // doubled for seamless loop

export default function TickerBar() {
  return (
    <div className="h-[42px] bg-white border-b border-gray-100 overflow-hidden flex items-center relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Powered by label */}
      <div className="absolute left-4 md:left-8 xl:left-20 flex items-center gap-1.5 z-20 bg-white pr-3">
        <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
          Powered by CoinGecko
        </span>
        <div className="w-px h-4 bg-gray-200" />
      </div>

      {/* Marquee */}
      <div className="flex animate-marquee pl-[180px] md:pl-[200px] xl:pl-[240px]">
        {items.map((coin, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 mr-8 whitespace-nowrap"
          >
            <span className="text-[12px] font-semibold text-[#003a50]">{coin.name}</span>
            <span className="text-[11px] text-gray-400">{coin.symbol}</span>
            <span className="text-[12px] font-medium text-[#003a50]">{coin.price}</span>
            <span
              className={`text-[11px] font-medium ${
                coin.up ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {coin.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
