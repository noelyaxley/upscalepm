import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

const team: TeamMember[] = [
  {
    name: 'Noel Yaxley',
    role: 'Founder & Principal',
    image: '/images/shared/about-upscale.png',
    bio: 'Noel brings over 15 years of experience spanning both architecture and client-side project management. At FJMT, he contributed to projects such as the Charles Perkins Centre and UTS Central, building a strong understanding of laboratory and education environments. His later roles saw him manage complex, multi-stakeholder projects for Root Partnerships, Property NSW, and Sydney Water. With a reputation for calm leadership and technical rigour, Noel founded Upscale to deliver places that not only meet practical demands but enhance the environments and communities they serve.',
  },
  {
    name: 'Kenny Gunawan',
    role: 'Project Manager',
    image: '/images/shared/team/kenny-gunawan.jpg',
    bio: 'Kenny brings a meticulous approach to project coordination and delivery. With experience across residential and commercial developments, he manages consultant teams, tracks programme milestones, and ensures every project stays on time and on budget. His attention to detail and proactive communication style make him a trusted point of contact for clients and contractors alike.',
  },
  {
    name: 'Nathan MacCullum',
    role: 'Project Manager',
    image: '/images/shared/team/nathan-maccullum.jpg',
    bio: 'Nathan specialises in construction-phase project management, bringing hands-on site experience to every engagement. From tender assessment through to practical completion, he coordinates trades, manages variations, and maintains quality standards across complex builds. His direct, solutions-oriented approach keeps projects moving and stakeholders informed.',
  },
]

export function TeamGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <div key={member.name} className="text-center">
          <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-2xl">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {member.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {member.bio}
          </p>
        </div>
      ))}
    </div>
  )
}
