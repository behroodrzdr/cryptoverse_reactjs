import React, { useState } from 'react';
import { Select, Row, Col, Avatar, Typography, Card, Image } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import placeHolderImage from '../images/placeHolder.png';
import Loader from '../components/Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurreny');
    const { data: cryptosList } = useGetCryptosQuery(100);
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 100 });
    return (
        <>
            { !isFetching ? (
                <>
                    {!simplified && (
                        <Row span={24}>
                            <Col span={24}>
                                <Select
                                    showSerch
                                    className="select-news"
                                    placeholder="select a Crypto"
                                    optionFilterProp="children"
                                    onChange={value => setNewsCategory(value)}
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
                                >
                                    <Option value="Cryprocurrency">Cryprocurrency</Option>
                                    {cryptosList?.data?.coins?.map(coin => <Option value={coin?.name}>{coin?.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    )}
                    <Row gutter={[24, 24]}>
                        {cryptoNews?.value?.map((news, i) => (
                            <Col xs={24} sm={12} lg={8} key={i}>
                                <Card hoverable className="news-card">
                                    <a href={news.url} target="_blank" rel="noreferrer">
                                        <div className="news-image-container">
                                            <Title className="news-title" level={4}>{news.name}</Title>
                                            <Image
                                                alt="news"
                                                fallback={placeHolderImage}
                                                preview={false}
                                                src={news?.image?.thumbnail?.contentUrl}
                                            />
                                        </div>
                                        <p>
                                            {news.description > 100 ? `${news.description.subString(0, 100)}...` : news.description}
                                        </p>
                                        <div className="provider-container">
                                            <Avatar with={32} height={32} src={news.provider[0]?.image?.thumbnail?.contentUrl || placeHolderImage} />
                                            <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news?.dataPublished).startOf('ss').fromNow()}</Text>
                                    </a>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : <Loader />}
        </>
    )
}

export default News
