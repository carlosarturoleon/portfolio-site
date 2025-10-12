import Image from 'next/image';

const services = [
  {
    title: 'Graphic Design',
    bgColor: 'bg-brand-blue-500',
    pattern: '/images/pattern-graphic-design.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2',
    order: 'order-1',
  },
  {
    title: 'UI/UX',
    bgColor: 'bg-brand-yellow-500',
    pattern: '/images/pattern-ui-ux.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-1 row-span-1 lg:col-span-1 lg:row-span-1',
    order: 'order-2',
  },
  {
    title: 'Apps',
    bgColor: 'bg-brand-pink-500',
    pattern: '/images/pattern-apps.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-1 row-span-1 lg:col-span-1 lg:row-span-1',
    order: 'order-3',
  },
  {
    title: 'Illustrations',
    bgColor: 'bg-brand-red-500',
    pattern: '/images/pattern-illustrations.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1 lg:col-span-2 lg:row-span-1',
    order: 'order-4 md:order-4 lg:order-5',
  },
  {
    title: 'Photography',
    bgColor: 'bg-brand-cyan-500',
    pattern: '/images/pattern-photography.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1 lg:col-span-2 lg:row-span-1',
    order: 'order-5 md:order-5 lg:order-4',
  },
  {
    title: 'Motion Graphics',
    bgColor: 'bg-brand-purple-500',
    pattern: '/images/pattern-motion-graphics.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1 lg:col-span-2 lg:row-span-1',
    order: 'order-6 md:order-6 lg:order-6',
  },
];

export default function Hero() {
  return (
    <section className="py-400">
      {/* Hero Heading */}
      <div className="text-center mb-500 md:mb-800 px-100 md:px-300 lg:px-0">
        <h1 className="text-1 md:text-1 text-neutral-900 mb-200 md:mb-300">
          Design solutions made easy
        </h1>
        <p className="text-4 text-neutral-400 mx-auto" style={{ maxWidth: '400px' }}>
          With over ten years of experience in various design disciplines, I'm your one-stop shop for your design needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 grid-rows-6 md:grid-cols-4 md:grid-rows-none lg:grid-cols-6 gap-200 md:gap-150 lg:gap-300">
        {services.map((service, index) => (
          <div
            key={index}
            className={`${service.bgColor} ${service.gridClass} ${service.order} rounded-8 md:rounded-16 p-300 flex flex-col justify-between items-start relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer ${service.gridClass.includes('col-span-1') ? 'aspect-square lg:aspect-auto lg:self-stretch' : service.gridClass.includes('col-span-2') && !service.gridClass.includes('row-span-2') ? 'aspect-[2/1]' : ''}`}
            style={{ minHeight: '150px' }}
          >
            <div className={`absolute aspect-square ${service.gridClass.includes('col-span-2') && service.gridClass.includes('row-span-2') ? '-right-200 top-300' : service.gridClass.includes('col-span-2') && !service.gridClass.includes('row-span-2') ? 'right-300 w-1/3 -top-100' : 'right-300 top-300'}`} style={{ width: service.gridClass.includes('col-span-2') && service.gridClass.includes('row-span-2') ? '55%' : '35%' }}>
              <Image
                src={service.pattern}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <h3 className={`text-3 ${service.textColor} relative z-10 mt-auto`}>
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}