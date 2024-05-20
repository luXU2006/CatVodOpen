import douban from './spider/video/douban.js';

import cntv from './spider/video/cntv.js';

import ng from './spider/video/ng.js';
import xinshijue from './spider/video/xinshijue.js';
import rrys from './spider/video/rrys.js';
import nongmin from './spider/video/nongmin.js';
import ddys from './spider/video/ddys.js';
// import baipiaoys from './spider/video/baipiaoys.js';
import wf from './spider/video/wf.js';
import nkvod from './spider/video/nkvod.js';
import czzy from './spider/video/czzy.js';
import ttian from './spider/video/ttian.js';
import zxzj from './spider/video/zxzj.js';
import saohuo from './spider/video/saohuo.js';
import xzys from './spider/video/xzys.js';

import anfun from './spider/video/anfun.js';
import clicli from './spider/video/clicli.js';

import live from './spider/video/live.js';

import tudou from './spider/wpan/tudou.js';
import wogg from './spider/wpan/wogg.js';
import wobg from './spider/wpan/wobg.js';
import cm from './spider/wpan/cm.js';
import ttkx from './spider/wpan/ttkx.js';

import push from './spider/video/push.js';

import ikan from './spider/video/ikan.js';
import kkys from './spider/video/kkys.js';

import xxpan from './spider/wpan/xxpan.js';
import qkpanso from './spider/wpan/qkpanso.js';
import juzi from './spider/wpan/juzi.js';
import qupan from './spider/wpan/qupan.js';
import maoli from './spider/wpan/maoli.js';
import aipan from './spider/wpan/aipan.js';
import yiso from './spider/wpan/yiso.js';
import xzt from './spider/wpan/xzt.js';
import mipan from './spider/wpan/mipan.js';
import upyun from './spider/wpan/upyun.js';
import pansearch from './spider/wpan/pansearch.js';
import bqr from './spider/wpan/bqr.js';
import yunpanres from './spider/wpan/yunpanres.js';
import yingso from './spider/wpan/yingso.js';
import duanjuku from './spider/wpan/duanjuku.js';
import jihehe from './spider/wpan/jihehe.js';

import alist from './spider/alist/alist.js';

import _13bqg from './spider/book/13bqg.js';
import lbgs from './spider/book/lbgs.js';
import bookan from './spider/book/bookan.js';
import _230ts from './spider/book/230ts.js';

import baozimh from './spider/book/baozimh.js';   
import bg from './spider/book/bengou.js';
import copymanga from './spider/book/copymanga.js';


const spiders = [douban, cntv, live, ikan, kkys, ng, xinshijue, nongmin, ddys, xzys, rrys, nkvod, ttian, wf, czzy, zxzj, saohuo, anfun, clicli, wogg, wobg, tudou, ttkx, cm, yingso, duanjuku, jihehe, yunpanres , xxpan, mipan, juzi, qkpanso, qupan, upyun, yiso, xzt, bqr, pansearch, maoli, aipan, push, alist, _13bqg, bookan, lbgs, _230ts, copymanga, baozimh, bg];

const spiderPrefix = '/spider';

/**
 * A function to initialize the router.
 *
 * @param {Object} fastify - The Fastify instance
 * @return {Promise<void>} - A Promise that resolves when the router is initialized
 */
export default async function router(fastify) {
    // register all spider router
    spiders.forEach((spider) => {
        const path = spiderPrefix + '/' + spider.meta.key + '/' + spider.meta.type;
        const paths = 'localhost:3006' + spiderPrefix + '/' + spider.meta.key + '/' + spider.meta.type + '/test';
        fastify.register(spider.api, { prefix: path });
        console.log(paths);
    });
    /**
     * @api {get} /check 检查
     */
    fastify.register(
        /**
         *
         * @param {import('fastify').FastifyInstance} fastify
         */
        async (fastify) => {
            fastify.get(
                '/check',
                /**
                 * check api alive or not
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    reply.send({ run: !fastify.stop });
                }
            );
            fastify.get(
                '/config',
                /**
                 * get catopen format config
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    const config = {
                        video: {
                            sites: [],
                        },
                        read: {
                            sites: [],
                        },
                        comic: {
                            sites: [],
                        },
                        music: {
                            sites: [],
                        },
                        pan: {
                            sites: [],
                        },
                        color: fastify.config.color || [],
                    };
                    spiders.forEach((spider) => {
                        let meta = Object.assign({}, spider.meta);
                        meta.api = spiderPrefix + '/' + meta.key + '/' + meta.type;
                        meta.key = 'nodejs_' + meta.key;
                        const stype = spider.meta.type;
                        if (stype < 10) {
                            config.video.sites.push(meta);
                        } else if (stype >= 10 && stype < 20) {
                            config.read.sites.push(meta);
                        } else if (stype >= 20 && stype < 30) {
                            config.comic.sites.push(meta);
                        } else if (stype >= 30 && stype < 40) {
                            config.music.sites.push(meta);
                        } else if (stype >= 40 && stype < 50) {
                            config.pan.sites.push(meta);
                        }
                    });
                    reply.send(config);
                }
            );
        }
    );
}
